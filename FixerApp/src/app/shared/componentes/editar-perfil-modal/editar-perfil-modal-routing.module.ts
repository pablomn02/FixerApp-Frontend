import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarPerfilModalPage } from './editar-perfil-modal.page';

const routes: Routes = [
  {
    path: '',
    component: EditarPerfilModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarPerfilModalPageRoutingModule {}
