import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsClientePage } from './tabs-cliente.page';

const routes: Routes = [
  {
    path: '',
    component: TabsClientePage,
    children: [
      {
        path: 'buscar',
        loadChildren: () => import('./buscar/buscar.module').then(m => m.BuscarPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
      },
      {
        path: 'contrataciones',
        loadChildren: () => import('./contrataciones/contrataciones.module').then( m => m.ContratacionesPageModule)
      },
      {
        path: '',
        redirectTo: 'buscar',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsClientePageRoutingModule {}