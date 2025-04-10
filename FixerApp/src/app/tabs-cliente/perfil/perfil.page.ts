import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    // Obtener el rol del usuario
    this.rol = this.loginService.getUserRole() || 'desconocido';

    // Obtener los datos del usuario autenticado
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

  logout() {
    this.loginService.logout();
    this.navCtrl.navigateRoot('/login');
  }
}