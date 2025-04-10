import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs-profesional',
  templateUrl: './tabs-profesional.page.html',
  styleUrls: ['./tabs-profesional.page.scss'],
  standalone: false
})
export class TabsProfesionalPage{

  constructor(
    private router: Router,
    private alertController: AlertController
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
}
