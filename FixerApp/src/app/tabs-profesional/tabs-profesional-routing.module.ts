import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsProfesionalPage } from './tabs-profesional.page';

const routes: Routes = [
  {
    path: '',
    component: TabsProfesionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsProfesionalPageRoutingModule {}
