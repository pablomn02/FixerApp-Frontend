import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class BuscarCalleService {
  public direccion: string = '';
  private direccionSubject = new Subject<string>();

  direccion$ = this.direccionSubject.asObservable();

  constructor(private httpClient: HttpClient) {}
  

  async obtenerUbicacion(): Promise<void> {
    try {
      let position: any;

      if (typeof window !== 'undefined' && navigator.geolocation) {
        position = await this.getWebGeolocation();
      } else {
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
    const url = `${environment.url}/geolocalizacion/reverse?lat=${lat}&lon=${lng}`;

    try {
      const data: any = await this.httpClient.get(url).toPromise();
      if (data && data.display_name) {
        console.log(data.display_name);
        this.direccion = data.display_name;
        this.direccionSubject.next(this.direccion);
      } else {
        console.error('No se encontró la dirección');
      }
    } catch (error) {
      console.error('Error obteniendo la dirección:', error);
    }
  }

}
