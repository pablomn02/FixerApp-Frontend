import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080';
  private loginUrl = `${this.baseUrl}/auth/login`;
  private registerUrl = `${this.baseUrl}/auth/register`;
  private recoverPasswordUrl = `${this.baseUrl}/auth/request-password-reset`;
  private resetPasswordUrl = `${this.baseUrl}/auth/reset-password`;
  private userUrl = `${this.baseUrl}/usuarios`;

  constructor(private http: HttpClient) {}

  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, contrasena }).pipe(
      tap((response: any) => {
        if (response.token && response.idUsuario && response.rol) {
          this.saveToken(response.token);
          this.saveUserId(response.idUsuario);
          this.saveUserRole(response.rol);
        }
      })
    );
  }

  registerCliente(usuario: Cliente): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('Registrando cliente - Cuerpo de la solicitud:', JSON.stringify(usuario, null, 2));
    return this.http.post(this.registerUrl, usuario, { headers });
  }

  registerProfesional(usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('Registrando profesional - Cuerpo de la solicitud:', JSON.stringify(usuario, null, 2));
    return this.http.post(this.registerUrl, usuario, { headers });
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
    return localStorage.getItem('userId');
  }

  saveUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
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
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
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