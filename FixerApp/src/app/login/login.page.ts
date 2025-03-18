import { Component, type OnInit } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from "@angular/router";
import { AnimationController } from "@ionic/angular";
import { 
  IonContent, 
  IonCard, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from "@ionic/angular/standalone";

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
  colorFrom = "#000046";
  colorTo = "#1c6ae0";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private animationCtrl: AnimationController,
  ) {
    // Initialize the form with validators
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log("Formulario entregado", this.loginForm.value);
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  register() {
    console.log("Navigate to register page");
  }
}
