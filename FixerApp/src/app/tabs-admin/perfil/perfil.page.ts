import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { ModalController, NavController, AlertController } from '@ionic/angular';
import { EditarPerfilModalPage } from 'src/app/shared/componentes/editar-perfil-modal/editar-perfil-modal.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  nombre: string = '';
  nombreUsuario: string = '';
  avatarUrl: string = '';
  rol: string = '';

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.rol = this.loginService.getUserRole() || 'desconocido';

    this.loginService.getCurrentUser().subscribe({
      next: (user) => {
        this.nombre = user.nombre;
        this.nombreUsuario = user.nombreUsuario;
        this.avatarUrl = 'https://ionicframework.com/docs/img/demos/avatar.svg';
      },
      error: (err) => {
        console.error('Error al obtener los datos del usuario:', err);
      }
    });
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.loginService.logout();
            this.navCtrl.navigateRoot('/login');
          }
        }
      ]
    });

    await alert.present();
  }

  async abrirEditarPerfil() {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilModalPage
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data === true) {
        this.ngOnInit();
      }
    });

    await modal.present();
  }
}
