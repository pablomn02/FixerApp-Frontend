import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilProfesionalModalPageRoutingModule } from './perfil-profesional-modal-routing.module';

import { PerfilProfesionalModalPage } from './perfil-profesional-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilProfesionalModalPageRoutingModule
  ],
  declarations: [PerfilProfesionalModalPage]
})
export class PerfilProfesionalModalPageModule {}
