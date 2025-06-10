import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaModalPageRoutingModule } from './mapa-modal-routing.module';

import { MapaModalPage } from './mapa-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaModalPageRoutingModule
  ],
  declarations: [MapaModalPage]
})
export class MapaModalPageModule {}
