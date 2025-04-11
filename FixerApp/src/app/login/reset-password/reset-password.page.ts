import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: false
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  token: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private loginService: LoginService
  ) {
    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Intentar leer el token con queryParams
    this.route.queryParams.subscribe(params => {
      console.log('Query params recibidos:', params);
      this.token = params['token'];
      console.log('Token extraído con queryParams:', this.token);

      // Si no se encuentra el token con queryParams, intentar leerlo manualmente
      if (!this.token) {
        const urlParams = new URLSearchParams(window.location.search);
        this.token = urlParams.get('token');
        console.log('Token extraído manualmente:', this.token);
      }

      // Si no se encuentra el token, redirigir al login
      if (!this.token) {
        this.errorMessage = 'Token no proporcionado. Por favor, usa el enlace del correo.';
        setTimeout(() => this.navCtrl.navigateRoot('/login'), 3000);
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.resetForm.valid && this.token) {
      this.isLoading = true;
      const loading = await this.loadingCtrl.create({
        message: 'Actualizando contraseña...',
        spinner: 'crescent',
        cssClass: 'custom-loading'
      });
      await loading.present();

      const { newPassword } = this.resetForm.value;
      this.loginService.resetPassword(this.token, newPassword).subscribe({
        next: (response) => {
          loading.dismiss();
          this.isLoading = false;
          this.successMessage = response.message || 'Contraseña restablecida exitosamente.';
          setTimeout(() => this.navCtrl.navigateRoot('/login'), 3000);
        },
        error: (err) => {
          loading.dismiss();
          this.isLoading = false;
          this.errorMessage = err.error.error || 'Error al restablecer la contraseña.';
          setTimeout(() => {
            this.errorMessage = null;
            this.navCtrl.navigateRoot('/login');
          }, 5000);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa el formulario correctamente.';
      Object.keys(this.resetForm.controls).forEach((key) => {
        const control = this.resetForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  volver() {
    this.navCtrl.navigateRoot('/login');
  }
}