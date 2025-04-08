import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
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
    private loginService: LoginService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  minimumAgeValidator(minAge: number) {
    return (control: any) => {
      if (!control.value) {
        return null;
      }
      const selectedDate = new Date(control.value);
      const today = new Date();
      const minDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
      return selectedDate <= minDate ? null : { minimumAge: true };
    };
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      const { name, email, username, password } = this.registerForm.value;
      const userData = {
        name,
        email,
        username,
        userType: 'cliente',
        password
      };

      console.log("Registrando al usuario", userData);

      

    //   this.loginService.register(userData).subscribe({
    //     next: (response) => {
    //       this.successMessage = 'Registro exitoso. Serás redirigido al login en 3 segundos.';
    //       setTimeout(() => {
    //         this.navCtrl.navigateRoot('/login');
    //       }, 3000);
    //     },
    //     error: (err) => {
    //       console.error('Error al registrarse:', err);
    //       if (err.status === 409) {
    //         this.errorMessage = 'El correo electrónico ya está registrado.';
    //       } else if (err.status === 0) {
    //         this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
    //       } else {
    //         this.errorMessage = 'Ocurrió un error al registrarse. Intenta de nuevo.';
    //       }
    //       setTimeout(() => {
    //         this.errorMessage = null;
    //       }, 5000);
    //     }
    //   });
    // } else {
    //   this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    //   setTimeout(() => {
    //     this.errorMessage = null;
    //   }, 5000);
    //   Object.keys(this.registerForm.controls).forEach((key) => {
    //     const control = this.registerForm.get(key);
    //     control?.markAsTouched();
    //   });
    }
  }

  volver() {
    console.log("Regresando a la página de selección de tipo de cuenta...");
    this.navCtrl.navigateBack('/register');
  }
}