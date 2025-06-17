import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
    loadChildren: () => import('./tabs-cliente/tabs-cliente.module').then(m => m.TabsClientePageModule),
    canActivate: [authGuard],
    data: { role: 'cliente' }
  },
  {
    path: 'tabs-profesional',
    loadChildren: () => import('./tabs-profesional/tabs-profesional.module').then(m => m.TabsProfesionalPageModule),
    canActivate: [authGuard],
    data: { role: 'profesional' }
  },
  {
    path: 'tabs-admin',
    loadChildren: () => import('./tabs-admin/tabs-admin.module').then(m => m.TabsAdminPageModule),
    canActivate: [authGuard],
    data: { role: 'admin' }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./login/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'contratar-modal',
    loadChildren: () => import('./shared/componentes/contratar-modal/contratar-modal.module').then(m => m.ContratarModalPageModule),
    canActivate: [authGuard],
    data: { role: 'cliente' }
  },
  {
    path: 'seleccionar-servicio-modal',
    loadChildren: () => import('./shared/componentes/seleccionar-servicio-modal/seleccionar-servicio-modal.module').then(m => m.SeleccionarServicioModalPageModule),
    canActivate: [authGuard],
    data: { role: 'cliente' }
  },
  {
    path: 'perfil-profesional-modal',
    loadChildren: () => import('./shared/componentes/perfil-profesional-modal/perfil-profesional-modal.module').then(m => m.PerfilProfesionalModalPageModule),
    canActivate: [authGuard],
    data: { roles: ['cliente', 'profesional', 'admin'] }
  },
  {
    path: 'editar-perfil-modal',
    loadChildren: () => import('./shared/componentes/editar-perfil-modal/editar-perfil-modal.module').then(m => m.EditarPerfilModalPageModule),
    canActivate: [authGuard],
    data: { roles: ['cliente', 'profesional', 'admin'] }
  },
  {
    path: 'valoracion-modal',
    loadChildren: () => import('./shared/componentes/valoracion-modal/valoracion-modal.module').then(m => m.ValoracionModalPageModule),
    canActivate: [authGuard],
    data: { role: 'cliente' }
  },
  {
    path: 'mapa-modal',
    loadChildren: () => import('./shared/componentes/mapa-modal/mapa-modal.module').then(m => m.MapaModalPageModule),
    canActivate: [authGuard],
    data: { roles: ['profesional'] }
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./shared/componentes/terminos-condiciones/terminos-condiciones.module').then(m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./shared/componentes/ayuda/ayuda.module').then(m => m.AyudaPageModule)
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}