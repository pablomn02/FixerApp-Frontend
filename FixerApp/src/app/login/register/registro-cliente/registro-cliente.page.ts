import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.page.html',
  styleUrls: ['./registro-cliente.page.scss'],
  standalone: false
})
export class RegistroClientePage implements OnInit {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(2)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      tipoUsuario: ['cliente']
    }, { validators: this.compararContrasenas });
  }

  ngOnInit() {}

  compararContrasenas(form: FormGroup) {
    const contrasena = form.get('contrasena')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return contrasena === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
  this.errorMessage = null;
  this.successMessage = null;

  if (this.registerForm.valid) {
    const loading = await this.loadingCtrl.create({
      message: 'Registrando...',
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await loading.present();

    const { nombre, email, usuario, contrasena, tipoUsuario } = this.registerForm.value;
    const userData = {
      nombre,
      email,
      usuario,
      contrasena,
      tipoUsuario
    };

    console.log("Registrando al usuario", userData);

    this.loginService.registerCliente(userData).subscribe({
      next: (response) => {
        loading.message = 'Redirigiendo...';
        this.successMessage = 'Registro exitoso. Serás redirigido al login en 3 segundos.';
        setTimeout(() => {
          loading.dismiss();
          this.navCtrl.navigateRoot('/login');
        }, 3000);
      },
      error: (err) => {
        loading.dismiss();
        console.error('Error al registrarse:', err);
        if (err.status === 400) {
          this.errorMessage = err.error.error || 'Datos inválidos. Por favor, verifica los campos.';
        } else if (err.status === 409) {
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
        } else {
          this.errorMessage = 'Ocurrió un error al registrarse. Intenta de nuevo.';
        }
        setTimeout(() => {
          this.errorMessage = null;
        }, 5000);
      }
    });
  } else {
    this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    setTimeout(() => {
      this.errorMessage = null;
    }, 5000);
    Object.keys(this.registerForm.controls).forEach((key) => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}


  volver() {
    console.log("Regresando a la página de selección de tipo de cuenta...");
    this.navCtrl.navigateBack('/register');
  }
}