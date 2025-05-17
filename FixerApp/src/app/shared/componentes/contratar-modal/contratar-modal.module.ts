import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContratarModalPageRoutingModule } from './contratar-modal-routing.module';

import { ContratarModalPage } from './contratar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContratarModalPageRoutingModule
  ],
  declarations: [ContratarModalPage]
})
export class ContratarModalPageModule {}
