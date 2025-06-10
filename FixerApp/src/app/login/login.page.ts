import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonCard, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonText,
  NavController
} from '@ionic/angular/standalone';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
  ]
})
export class LoginPage {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.errorMessage = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (data) => {
          console.log('Usuario:', data);
          
          localStorage.clear();
          localStorage.setItem('token', data.token);
          localStorage.setItem('idUsuario', data.idUsuario);
          localStorage.setItem('rol', data.rol);

          this.redirigirUsuario(data.rol);
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          if (err.status === 401) {
            this.errorMessage = 'Correo o contraseña incorrectos. Por favor, intenta de nuevo.';
          } else if (err.status === 0) {
            this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
          } else {
            this.errorMessage = 'Ocurrió un error al iniciar sesión. Vuelve a intentarlo.';
          }
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  registro() {
    console.log('Redirigiendo al usuario al registro...');
    this.navCtrl.navigateRoot('/register');
  }

  recuperarContrasena() {
    console.log('Redirigiendo al usuario a recuperar contraseña...');
    this.navCtrl.navigateRoot('/recuperar-contrasena');
  }

  redirigirUsuario(rol: string) {
    console.log('Rol del usuario:', rol);
    if (rol === 'cliente') {
      console.log('Redirigiendo al usuario a los tabs de cliente...');
      this.navCtrl.navigateRoot('/tabs-cliente');
    } else if (rol === 'profesional') {
      console.log('Redirigiendo al usuario a los tabs de profesional...');
      this.navCtrl.navigateRoot('/tabs-profesional/solicitudes');
    } else if (rol === 'admin') {
      console.log('Redirigiendo al usuario a los tabs de administrador...');
      this.navCtrl.navigateRoot('/tabs-admin/usuarios');
    }
  }
}