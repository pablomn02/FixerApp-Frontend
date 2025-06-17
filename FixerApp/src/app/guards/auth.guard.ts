import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  // Verificar si el usuario está autenticado
  if (!loginService.isAuthenticated()) {
    router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  const userRole = loginService.getUserRole();
  const expectedRole = route.data['role'];

  if (expectedRole && userRole !== expectedRole) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};