import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContratarModalPage } from './contratar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ContratarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContratarModalPageRoutingModule {}
