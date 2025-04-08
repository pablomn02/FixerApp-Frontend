import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroProfesionalPage } from './registro-profesional.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroProfesionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroProfesionalPageRoutingModule {}
