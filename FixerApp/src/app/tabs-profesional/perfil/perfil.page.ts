import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

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
    private router: Router
  ) {}

  ngOnInit() {
    // Obtener el rol del usuario
    this.rol = this.loginService.getUserRole() || 'desconocido';

    // Obtener los datos del usuario autenticado
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

  logout() {
    this.loginService.logout();
    this.navCtrl.navigateRoot('/login');
  }

  goToCambiarContrasena() {
    console.log("Intentando navegar a /perfil/cambiar-contrasena");
    // Usar Router en lugar de NavController para la navegación
    this.router.navigateByUrl('/perfil/cambiar-contrasena').then(
      (success) => {
        console.log('Navegación a /perfil/cambiar-contrasena exitosa:', success);
      },
      (error) => {
        console.error('Error al navegar a /perfil/cambiar-contrasena:', error);
      }
    );
  }
}