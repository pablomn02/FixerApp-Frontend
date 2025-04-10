import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.page.html',
  styleUrls: ['./registro-profesional.page.scss'],
  standalone: false
})
export class RegistroProfesionalPage {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loginService: LoginService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      precioHora: ['', [Validators.required, Validators.min(0)]],
      horarioDisponible: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.compararContrasenas });
  }


  compararContrasenas(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      const { nombre, email, username, especialidad, precioHora, horarioDisponible, password } = this.registerForm.value;
      const userData = {
        nombre: name,
        email,
        usuario: username,
        contrasena: password,
        rol: 'profesional',
        especialidad,
        precioHora,
        horarioDisponible
      };

      console.log("Registrando al profesional", userData);

      this.loginService.registerProfesional(userData).subscribe({
        next: (response) => {
          this.successMessage = 'Registro exitoso. Serás redirigido en 3 segundos.';
          setTimeout(() => {
            this.navCtrl.navigateRoot('/login');
          }, 3000);
        },
        error: (err) => {
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