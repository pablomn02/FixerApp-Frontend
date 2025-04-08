import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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
    private navCtrl: NavController
  ) {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.recoverForm.valid) {
      const { email } = this.recoverForm.value;
      console.log('Enviando correo de recuperación a:', email);
      
      this.successMessage = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
    
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