import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilProfesionalModalPage } from './perfil-profesional-modal.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilProfesionalModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilProfesionalModalPageRoutingModule {}
