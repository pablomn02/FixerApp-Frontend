import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsProfesionalPage } from './tabs-profesional.page';

const routes: Routes = [
  {
    path: '',
    component: TabsProfesionalPage,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'solicitudes',
        loadChildren: () => import('./solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule)
      },
      {
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then( m => m.AgendaPageModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsProfesionalPageRoutingModule {}
