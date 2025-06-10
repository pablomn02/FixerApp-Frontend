import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { AlertController } from '@ionic/angular/standalone';
import { EditarPerfilModalPage } from 'src/app/shared/componentes/editar-perfil-modal/editar-perfil-modal.page';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  nombre: string = 'Nombre del Profesional';
  nombreUsuario: string = 'usuario123';
  avatarUrl: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';
  rol: string = 'desconocido';

  constructor(
    private loginService: LoginService,
    private navCtrl: NavController,
    private router: Router,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.rol = this.loginService.getUserRole() || 'desconocido';

    this.loginService.getCurrentUser().subscribe({
      next: (user) => {
        this.nombre = user.nombre || this.nombre;
        this.nombreUsuario = user.nombreUsuario || this.nombreUsuario;
        this.avatarUrl = user.avatarUrl || 'https://ionicframework.com/docs/img/demos/avatar.svg';
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

  goToCambiarContrasena() {
    console.log("Intentando navegar a /perfil/cambiar-contrasena");
    this.router.navigateByUrl('/perfil/cambiar-contrasena').then(
      (success) => {
        console.log('Navegación a /perfil/cambiar-contrasena exitosa:', success);
      },
      (error) => {
        console.error('Error al navegar a /perfil/cambiar-contrasena:', error);
      }
    );
  }

    async abrirEditarPerfil() {
      console.log("Abriendo modal")
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