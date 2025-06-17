import { Component, OnInit } from '@angular/core';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { ProfesionalServicioSimple } from 'src/app/shared/interfaces/profesional-servicio-simple';
import { AlertController, ModalController } from '@ionic/angular';
import { PerfilProfesionalModalPage } from 'src/app/shared/componentes/perfil-profesional-modal/perfil-profesional-modal.page';
import { ContratarModalPage } from 'src/app/shared/componentes/contratar-modal/contratar-modal.page';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false
})
export class FavoritosPage implements OnInit {
  favoritos: ProfesionalServicioSimple[] = [];
  idUsuario: number = 0;

  constructor(
    private favoritoServicio: FavoritoService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    const id = localStorage.getItem('idUsuario');
    if (id) {
      this.idUsuario = parseInt(id, 10);
      this.cargarFavoritos();
    }
  }

  cargarFavoritos() {
    this.favoritoServicio.getFavoritos(this.idUsuario).subscribe((datos) => {
      this.favoritos = datos.map(p => ({
        ...p,
        isFavorito: true
      }));
    });
  }

  abrirPerfil(profesional: ProfesionalServicioSimple) {
    this.modalCtrl.create({
      component: PerfilProfesionalModalPage,
      componentProps: {
        profesional: profesional,
        usuarioId: this.idUsuario
      }
    }).then(modal => {
      modal.onDidDismiss().then(resultado => {
        if (resultado.data === true) {
          this.cargarFavoritos();
        }
      });
      modal.present();
    });
  }

  actualizarFavoritos(profesional: ProfesionalServicioSimple) {
    const index = this.favoritos.findIndex(p => p.idUsuario === profesional.idUsuario);
    if (index !== -1) {
      this.favoritos[index].isFavorito = !this.favoritos[index].isFavorito;
      if (!this.favoritos[index].isFavorito) {
        this.favoritos.splice(index, 1);
      }
    }
  }

  contratar(profesional: ProfesionalServicioSimple) {
    if (!profesional.idProfesionalServicio || !profesional.ubicacion) {
      return;
    }

    this.loadingCtrl.create({
      message: 'Comprobando distancia...',
      spinner: 'crescent'
    }).then(loader => {
      loader.present();

      this.obtenerUbicacionCliente((ubicacionCliente) => {
        loader.dismiss();

        if (!ubicacionCliente) {
          this.mostrarAlerta('No se pudo obtener tu ubicación.');
          return;
        }

        const distancia = this.calcularDistanciaKm(
          ubicacionCliente.latitud,
          ubicacionCliente.longitud,
          profesional.ubicacion.latitud,
          profesional.ubicacion.longitud
        );

        if (distancia <= 30) {
          this.modalCtrl.create({
            component: ContratarModalPage,
            componentProps: {
              profesional: profesional,
              usuarioId: this.idUsuario
            }
          }).then(modal => modal.present());
        } else {
          this.mostrarAlerta(`El profesional está a ${distancia.toFixed(1)} km. Fuera del alcance.`);
        }
      });
    });
  }

  mostrarAlerta(mensaje: string) {
    this.alertCtrl.create({
      header: 'Aviso',
      message: mensaje,
      buttons: ['Aceptar']
    }).then(alerta => alerta.present());
  }



  obtenerUbicacionCliente(callback: (ubicacion: { latitud: number; longitud: number } | null) => void) {
    if (!navigator.geolocation) {
      callback(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (posicion) => {
        callback({
          latitud: posicion.coords.latitude,
          longitud: posicion.coords.longitude
        });
      },
      () => {
        callback(null);
      },
      { enableHighAccuracy: true }
    );
  }

  calcularDistanciaKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.aRadianes(lat2 - lat1);
    const dLon = this.aRadianes(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.aRadianes(lat1)) * Math.cos(this.aRadianes(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  aRadianes(valor: number): number {
    return valor * Math.PI / 180;
  }
}
