import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { 
  IonContent, 
  IonCard, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  NavController
} from "@ionic/angular/standalone";
import { LoginService } from "../shared/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private navCtrl: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.loginService.login(email, password).subscribe({
        next: (data) => {
          console.log("Usuario:", data)
          this.loginService.saveToken(data.token); // Guardamos el token
          this.redirigirUsuario(data.rol) // Redirigimos al usuario dependiendo de su rol
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          alert('Error al iniciar sesión');
        }
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  registro() {
    console.log("Redirigiendo al usuario al registro...")
    this.router.navigate(['../registro']);
  }

  recuperacionPassword() {
    console.log("Redirigiendo al usuario a recuperar contraseña...")
    this.router.navigate(['/recuperar-password']);
  }

  redirigirUsuario(rol: string) {
    console.log("Rol del usuario:", rol);
    if (rol === "cliente") {
      console.log("Redirigiendo al usuario a la pagina principal...");
      this.navCtrl.navigateRoot('/home/buscar')
    }
  }
}