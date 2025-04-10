import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabsClientePageRoutingModule } from './tabs-cliente-routing.module';
import { TabsClientePage } from './tabs-cliente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsClientePageRoutingModule
  ],
  declarations: [TabsClientePage]
})
export class TabsClientePageModule {}