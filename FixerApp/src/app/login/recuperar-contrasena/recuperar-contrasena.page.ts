import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
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
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private loginService: LoginService
  ) {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;
    this.isLoading = true;

    if (this.recoverForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Enviando correo de recuperación...',
        spinner: 'crescent',
        cssClass: 'custom-loading'
      });
      await loading.present();

      const { email } = this.recoverForm.value;
      this.loginService.requestPasswordReset(email).subscribe({
        next: (response: any) => {
          loading.dismiss();
          this.isLoading = false;
          this.successMessage = response.message || 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
          const token = response.token;
          if (token) {
            setTimeout(() => {
              this.router.navigate(['/reset-password'], { queryParams: { token } });
            }, 2000);
          }
        },
        error: async (err) => {
          loading.dismiss();
          this.isLoading = false;
          
          if (err.status === 404) {
            const toast = await this.toastCtrl.create({
              message: 'No se encontró una cuenta asociada con este correo electrónico',
              duration: 3000,
              position: 'top',
              color: 'danger',
              cssClass: 'custom-toast'
            });
            await toast.present();
          } else {
            this.errorMessage = err.error?.error || 'Error al enviar el enlace de recuperación.';
            setTimeout(() => {
              this.errorMessage = null;
            }, 5000);
          }
        }
      });
    } else {
      this.isLoading = false;
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