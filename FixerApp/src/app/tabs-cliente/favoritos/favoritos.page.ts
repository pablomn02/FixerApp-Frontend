import { Component, OnInit } from '@angular/core';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { ProfesionalServicioSimple } from 'src/app/shared/interfaces/profesional-servicio-simple';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';
import { PerfilProfesionalModalPage } from 'src/app/shared/componentes/perfil-profesional-modal/perfil-profesional-modal.page';
import { ContratarModalPage } from 'src/app/shared/componentes/contratar-modal/contratar-modal.page';
import { BuscarCalleService } from 'src/app/shared/services/buscar-calle.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit {
  favorites: ProfesionalServicioSimple[] = [];
  usuarioIdLogueado: number = 0;
  direccion: string = '';

  constructor(
    private favoritoService: FavoritoService,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private buscarCalleService: BuscarCalleService
  ) {}

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('idUsuario');
    if (idGuardado) {
      this.usuarioIdLogueado = parseInt(idGuardado, 10);
      this.cargarFavoritos();
    }

    this.buscarCalleService.direccion$.subscribe((dir) => {
      this.direccion = dir;
    });

    this.buscarCalleService.obtenerUbicacion();
  }

  cargarFavoritos() {
    this.favoritoService.getFavoritos(this.usuarioIdLogueado).subscribe(
      (data) => {
        this.favorites = data.map(p => ({
          ...p,
          isFavorito: true
        }));
      },
      (error) => {
        console.error('Error al obtener favoritos', error);
      }
    );
  }

  abrirPerfil(profesional: ProfesionalServicioSimple) {
    this.modalCtrl.create({
      component: PerfilProfesionalModalPage,
      componentProps: {
        profesional: profesional,
        usuarioId: this.usuarioIdLogueado
      },
      cssClass: 'perfil-modal'
    }).then(modal => {
      modal.onDidDismiss().then(result => {
        if (result.data === true) {
          const index = this.favorites.findIndex(p => p.idUsuario === profesional.idUsuario);
          if (index !== -1) {
            this.favorites[index].isFavorito = !this.favorites[index].isFavorito;
            if (!this.favorites[index].isFavorito) {
              this.favorites.splice(index, 1);
            }
          }
        }
      });
      modal.present();
    });
  }

  contratar(profesional: ProfesionalServicioSimple) {
    if (!profesional.idProfesionalServicio) {
      console.log('El profesional no tiene idProfesionalServicio');
      return;
    }

    if (!profesional.ubicacion || profesional.ubicacion.latitud == null || profesional.ubicacion.longitud == null) {
      this.presentToast('El profesional no tiene ubicación.', 'danger');
      return;
    }

    this.loadingCtrl.create({
      message: 'Comprobando la distancia al profesional...',
      spinner: 'circles'
    }).then(loader => {
      loader.present();

      setTimeout(() => {
        this.obtenerUbicacionCliente((ubicacionCliente) => {
          loader.dismiss();

          if (!ubicacionCliente) {
            this.presentToast('No se pudo obtener tu ubicación.', 'danger');
            return;
          }

          const distancia = this.calcularDistanciaKm(
            ubicacionCliente.latitud,
            ubicacionCliente.longitud,
            profesional.ubicacion!.latitud,
            profesional.ubicacion!.longitud
          );

          if (distancia > 30) {
            this.presentToast(`El profesional está a ${distancia.toFixed(1)} km, fuera del rango.`, 'warning');
            return;
          }

          this.modalCtrl.create({
            component: ContratarModalPage,
            componentProps: {
              profesional: profesional,
              usuarioId: this.usuarioIdLogueado
            },
            cssClass: 'classic-modal'
          }).then(modal => modal.present());
        });
      }, 2000);
    });
  }

  obtenerUbicacionCliente(callback: (ubicacion: { latitud: number; longitud: number } | null) => void) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          callback({
            latitud: position.coords.latitude,
            longitud: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error obteniendo ubicación:', error);
          callback(null);
        },
        { enableHighAccuracy: true }
      );
    } else {
      callback(null);
    }
  }

  calcularDistanciaKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRadian(lat2 - lat1);
    const dLon = this.toRadian(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadian(lat1)) * Math.cos(this.toRadian(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadian(value: number): number {
    return value * Math.PI / 180;
  }

  presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    }).then(toast => toast.present());
  }
}
