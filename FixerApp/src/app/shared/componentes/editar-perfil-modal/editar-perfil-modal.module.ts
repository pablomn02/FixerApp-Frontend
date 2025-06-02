import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarPerfilModalPageRoutingModule } from './editar-perfil-modal-routing.module';

import { EditarPerfilModalPage } from './editar-perfil-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarPerfilModalPageRoutingModule
  ],
  declarations: [EditarPerfilModalPage],
  exports: [EditarPerfilModalPage]
})
export class EditarPerfilModalPageModule {}
