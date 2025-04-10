import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'recuperar-contrasena',
    loadChildren: () => import('./login/recuperar-contrasena/recuperar-contrasena.module').then(m => m.RecuperarContrasenaPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./login/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'registro-cliente',
    loadChildren: () => import('./login/register/registro-cliente/registro-cliente.module').then(m => m.RegistroClientePageModule)
  },
  {
    path: 'registro-profesional',
    loadChildren: () => import('./login/register/registro-profesional/registro-profesional.module').then(m => m.RegistroProfesionalPageModule)
  },
  {
    path: 'tabs-cliente',
    loadChildren: () => import('./tabs-cliente/tabs-cliente.module').then(m => m.TabsClientePageModule)
  },
  {
    path: 'tabs-profesional',
    loadChildren: () => import('./tabs-profesional/tabs-profesional.module').then(m => m.TabsProfesionalPageModule)
  },
  {
    path: 'tabs-admin',
    loadChildren: () => import('./tabs-admin/tabs-admin.module').then(m => m.TabsAdminPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}