import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-recuperar-contrasena',
  templateUrl: './recuperar-contrasena.page.html',
  styleUrls: ['./recuperar-contrasena.page.scss'],
  standalone: false
})
export class RecuperarContrasenaPage {
  recoverForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private loginService: LoginService
  ) {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.recoverForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Enviando...',
        spinner: 'crescent',
        cssClass: 'custom-loading'
      });
      await loading.present();

      const { email } = this.recoverForm.value;
      this.loginService.requestPasswordReset(email).subscribe({
        next: (response) => {
          loading.dismiss();
          this.successMessage = response.message || 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
        },
        error: (err) => {
          loading.dismiss();
          this.errorMessage = err.error.error || 'Error al enviar el enlace de recuperación.';
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      });
    } else {
      this.errorMessage = 'Por favor, introduce un correo electrónico válido.';
      Object.keys(this.recoverForm.controls).forEach((key) => {
        const control = this.recoverForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  volver() {
    this.navCtrl.navigateRoot('/login');
  }
}