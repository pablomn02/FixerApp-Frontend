import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsProfesionalPageRoutingModule } from './tabs-profesional-routing.module';

import { TabsProfesionalPage } from './tabs-profesional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsProfesionalPageRoutingModule
  ],
  declarations: [TabsProfesionalPage]
})
export class TabsProfesionalPageModule {}
