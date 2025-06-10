import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { TerminosCondicionesPage } from '../shared/componentes/terminos-condiciones/terminos-condiciones.page';
import { AyudaPage } from '../shared/componentes/ayuda/ayuda.page';

@Component({
  selector: 'app-tabs-cliente',
  templateUrl: './tabs-cliente.page.html',
  styleUrls: ['./tabs-cliente.page.scss'],
  standalone: false
})
export class TabsClientePage {

  constructor(
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar tu sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cierre de sesión cancelado');
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.logout();
          }
        }
      ]
    });

    await alert.present();
  }

  logout() {
    localStorage.removeItem('token');
    console.log("Sesión cerrada exitosamente");
    this.router.navigate(['/login']);
  }

  async abrirTerminos() {
    const modal = await this.modalCtrl.create({
      component: TerminosCondicionesPage,
    });
    await modal.present();
  }

  async abrirAyuda() {
    const modal = await this.modalCtrl.create({
      component: AyudaPage,
    });
    await modal.present();
  }

}
