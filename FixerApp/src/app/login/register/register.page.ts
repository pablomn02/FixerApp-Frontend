import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  constructor(private navCtrl: NavController) {}

  selectAccountType(type: string) {
    if (type === 'cliente') {
      this.navCtrl.navigateForward('/registro-cliente');
    } else if (type === 'profesional') {
      this.navCtrl.navigateForward('/registro-profesional');
    }
  }

  volver() {
    this.navCtrl.navigateBack('/login');
  }
}