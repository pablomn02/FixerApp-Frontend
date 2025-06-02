import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { EditarPerfilModalPageModule } from 'src/app/shared/componentes/editar-perfil-modal/editar-perfil-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    EditarPerfilModalPageModule
  ],
  declarations: [PerfilPage]
})
export class PerfilPageModule {}
