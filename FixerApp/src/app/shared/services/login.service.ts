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
    return this.http.post(this.registerUrl, usuario);
  }

  registerProfesional(usuario: any): Observable<any> {
    return this.http.post(this.registerUrl, usuario)
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

    // Configurar los encabezados con el token
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
}