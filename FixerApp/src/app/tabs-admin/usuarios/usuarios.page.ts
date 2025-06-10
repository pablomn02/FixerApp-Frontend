import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { EditarPerfilModalPage } from 'src/app/shared/componentes/editar-perfil-modal/editar-perfil-modal.page';
import { Cliente } from 'src/app/shared/interfaces/cliente';
import { ProfesionalServicioSimple } from 'src/app/shared/interfaces/profesional-servicio-simple';
import { UsuarioService } from 'src/app/shared/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
  standalone: false
})
export class UsuariosPage implements OnInit {
  listaUsuarios: any[] = [];
  listaClientes: Cliente[] = [];
  listaProfesionales: ProfesionalServicioSimple[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getAllUsuarios();
  }

  getAllUsuarios() {
    this.usuarioService.getAllUsuarios().subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.listaUsuarios = data;
          this.filtrarUsuariosByTipo(data);
        }
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }

  filtrarUsuariosByTipo(usuarios: any[]) {
    this.listaClientes = [];
    this.listaProfesionales = [];
    
    usuarios.forEach(usuario => {
      if (usuario.tipoUsuario === 'cliente') {
        this.listaClientes.push(usuario as Cliente);
      } else if (usuario.tipoUsuario === 'profesional') {
        this.listaProfesionales.push(usuario as ProfesionalServicioSimple);
      }
    });
  }

  async editarUsuario(usuario: any) {
    const modal = await this.modalCtrl.create({
      component: EditarPerfilModalPage,
      componentProps: {
        idUsuario: usuario.id
      }
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data === true) {
        this.getAllUsuarios();
      }
    });

    await modal.present();
  }

  async deleteUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estás seguro de que quieres eliminar a ${usuario.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.usuarioService.deleteUsuario(usuario.id).subscribe({
              next: () => {
                this.getAllUsuarios();
              },
              error: () => {
                this.presentErrorAlert();
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentErrorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No se pudo eliminar el usuario. Por favor, intenta de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cerrar Sesión',
      message: '¿Estás seguro de que quieres cerrar tu sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
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
    this.router.navigate(['/login']);
  }
}
