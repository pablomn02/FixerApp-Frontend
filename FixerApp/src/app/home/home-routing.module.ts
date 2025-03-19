import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'buscar',
        loadChildren: () => import('../buscar/buscar.module').then(m => m.BuscarPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then(m => m.FavoritosPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        path: 'servicios',
        loadChildren: () => import('../servicios/servicios.module').then(m => m.ServiciosPageModule)
      },
      {
        path: '',
        redirectTo: 'buscar',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}