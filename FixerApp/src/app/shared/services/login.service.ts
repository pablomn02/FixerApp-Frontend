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

  // Método para iniciar sesión
  login(email: string, contrasena: string): Observable<any> {
    return this.http.post(this.loginUrl, { email, contrasena }).pipe(
      tap((response: any) => {
        // Almacenar el token, el ID del usuario y el rol en localStorage
        if (response.token && response.idUsuario && response.rol) {
          this.saveToken(response.token);
          this.saveUserId(response.idUsuario);
          this.saveUserRole(response.rol);
        }
      })
    );
  }

  // Método para registrar un cliente
  registerCliente(usuario: Cliente): Observable<any> {
    return this.http.post(this.registerUrl, usuario);
  }

  registerProfesional(usuario: any): Observable<any> {
    return this.http.post(this.registerUrl, usuario)
  }

  // Almacenar el token en localStorage
  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  // Obtener el token de localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Almacenar el ID del usuario en localStorage
  saveUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  // Obtener el ID del usuario de localStorage
  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  // Almacenar el rol del usuario en localStorage
  saveUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  // Obtener el rol del usuario de localStorage
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Obtener los datos del usuario autenticado
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

    // Hacer la solicitud al backend para obtener los datos del usuario
    return this.http.get(`${this.userUrl}/${userId}`, { headers });
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}