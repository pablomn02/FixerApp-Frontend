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
        path: 'valoraciones',
        loadChildren: () => import('./valoraciones/valoraciones.module').then( m => m.ValoracionesPageModule)
      }
    ]
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsProfesionalPageRoutingModule {}
