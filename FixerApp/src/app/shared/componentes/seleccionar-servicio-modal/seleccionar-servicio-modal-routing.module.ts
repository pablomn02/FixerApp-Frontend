import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeleccionarServicioModalPage } from './seleccionar-servicio-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SeleccionarServicioModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeleccionarServicioModalPageRoutingModule {}
