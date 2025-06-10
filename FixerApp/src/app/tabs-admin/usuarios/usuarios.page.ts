import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
    private usuarioService: UsuarioService
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
          console.log('Usuarios:', this.listaUsuarios);
          console.log('Clientes:', this.listaClientes);
          console.log('Profesionales:', this.listaProfesionales);
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
    this.router.navigate(['/edit-usuario', usuario.id]);
  }

  async deleteUsuario(usuario: any) {
    const alert = await this.alertController.create({
      header: 'Eliminar Usuario',
      message: `¿Estás seguro de que quieres eliminar a ${usuario.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            this.usuarioService.deleteUsuario(usuario.id).subscribe({
              next: () => {
                console.log('Usuario eliminado con éxito');
                this.getAllUsuarios();
              },
              error: (err) => {
                console.error('Error al eliminar usuario:', err);
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
    console.log("Sesión cerrada con éxito");
    this.router.navigate(['/login']);
  }

}
