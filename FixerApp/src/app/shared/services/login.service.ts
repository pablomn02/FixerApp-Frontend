import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = environment.url;
  private loginUrl = `${this.baseUrl}/auth/login`;
  private registerClienteUrl = `${this.baseUrl}/auth/register/cliente`;
  private registerProfesionalUrl = `${this.baseUrl}/auth/register/profesional`;
  private recoverPasswordUrl = `${this.baseUrl}/auth/request-password-reset`;
  private resetPasswordUrl = `${this.baseUrl}/auth/reset-password`;
  private userUrl = `${this.baseUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, contrasena }).pipe(
      tap((response: any) => {
        console.log('Login response:', response);

        if (response.token && response.idUsuario && response.rol) {
          this.saveToken(response.token);
          this.saveUserId(response.idUsuario);
          this.saveUserRole(response.rol);

          console.log('Guardado en localStorage:');
          console.log('Token:', localStorage.getItem('token'));
          console.log('UserID:', localStorage.getItem('idUsuario'));
          console.log('Rol:', localStorage.getItem('rol'));
        } else {
          console.warn('Faltan datos en la respuesta del login');
        }
      })
    );
  }


  registerCliente(usuario: Cliente): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('Registrando cliente - Cuerpo de la solicitud:', JSON.stringify(usuario, null, 2));
    return this.http.post(this.registerClienteUrl, usuario, { headers });
  }

  registerProfesional(usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('Registrando profesional - Cuerpo de la solicitud:', JSON.stringify(usuario, null, 2));
    return this.http.post(this.registerProfesionalUrl, usuario, { headers });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): string | null {
    return localStorage.getItem('idUsuario');
  }

  saveUserRole(role: string): void {
    localStorage.setItem('rol', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('rol');
  }

  getCurrentUser(): Observable<any> {
    const token = this.getToken();
    const userId = this.getUserId();

    if (!token || !userId) {
      throw new Error('No hay usuario autenticado');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.userUrl}/${userId}`, { headers });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rol');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  requestPasswordReset(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.recoverPasswordUrl, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.resetPasswordUrl, { token, newPassword });
  }
}