import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoginService } from './shared/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  // Se ejecuta al iniciar la app para conservar el usuario
  checkAuthentication() {
    if (this.loginService.isAuthenticated()) {
      // Verificar si el token es válido llamando al backend
      this.loginService.getCurrentUser().subscribe({
        next: (user) => {
          console.log('Usuario autenticado:', user);
          const role = this.loginService.getUserRole();
          this.redirectUser(role);
        },
        error: (err) => {
          console.error('Token inválido o expirado:', err);
          this.loginService.logout();
          this.navCtrl.navigateRoot('/login');
        },
      });
    } else {
      console.log('No hay usuario autenticado, redirigiendo a login...');
      this.navCtrl.navigateRoot('/login');
    }
  }

  redirectUser(role: string | null) {
    if (role === 'cliente') {
      console.log('Redirigiendo a tabs-cliente...');
      this.navCtrl.navigateRoot('/tabs-cliente');
    } else if (role === 'profesional') {
      console.log('Redirigiendo a tabs-profesional...');
      this.navCtrl.navigateRoot('/tabs-profesional/solicitudes');
    } else if (role === 'admin') {
      console.log('Redirigiendo a tabs-admin...');
      this.navCtrl.navigateRoot('/tabs-admin/usuarios');
    } else {
      console.log('Rol no válido, redirigiendo a login...');
      this.navCtrl.navigateRoot('/login');
    }
  }
}