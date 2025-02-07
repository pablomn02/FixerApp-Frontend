import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Subject } from 'rxjs';  // Importar Subject

@Injectable({
  providedIn: 'root'
})
export class BuscarCalleService {
  public direccion: string = '';
  private direccionSubject = new Subject<string>();  // Crear un Subject para emitir cambios

  direccion$ = this.direccionSubject.asObservable();  // Hacer que otros componentes puedan suscribirse

  constructor(private httpClient: HttpClient) {}

  async obtenerUbicacion(): Promise<void> {
    try {
      let position: any;

      // Verificamos si estamos en la web
      if (typeof window !== 'undefined' && navigator.geolocation) {
        // Usamos la geolocalización del navegador en la web
        position = await this.getWebGeolocation();
      } else {
        // Usamos la geolocalización de Capacitor en móviles
        const permiso = await Geolocation.requestPermissions();
        if (permiso.location === 'granted') {
          position = await Geolocation.getCurrentPosition();
        } else {
          console.log('Permiso de ubicación denegado');
          return;
        }
      }

      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      await this.obtenerDireccion(lat, lng);

    } catch (error) {
      console.error('Error obteniendo la ubicación:', error);
    }
  }

  getWebGeolocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => resolve(position),
        (error) => reject(error)
      );
    });
  }

  async obtenerDireccion(lat: number, lng: number): Promise<void> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    try {
      const data: any = await this.httpClient.get(url).toPromise();
      if (data && data.display_name) {
        console.log(data.display_name);
        this.direccion = data.display_name;
        this.direccionSubject.next(this.direccion);  // Emitir el nuevo valor de la dirección
      } else {
        console.error('No se encontró la dirección');
      }
    } catch (error) {
      console.error('Error obteniendo la dirección:', error);
    }
  }
}
