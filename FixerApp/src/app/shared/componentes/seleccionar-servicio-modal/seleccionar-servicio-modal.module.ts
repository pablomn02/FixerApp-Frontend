import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeleccionarServicioModalPageRoutingModule } from './seleccionar-servicio-modal-routing.module';

import { SeleccionarServicioModalPage } from './seleccionar-servicio-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeleccionarServicioModalPageRoutingModule
  ],
  declarations: [SeleccionarServicioModalPage]
})
export class SeleccionarServicioModalPageModule {}
