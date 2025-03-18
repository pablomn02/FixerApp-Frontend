import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPage } from './login.page';
import { HomePage } from '../home/home.page'; // Necesitas un HomePage

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage // Ruta independiente para login
  },
  {
    path: 'home',
    component: HomePage, // Componente base para las rutas hijas
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
  },
  {
    path: '',
    redirectTo: '/login', // Por defecto va a login
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LoginPageRoutingModule {}