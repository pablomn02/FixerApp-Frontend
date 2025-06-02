// src/app/shared/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  getUsuarioById(id: number) {
    return this.http.get(`${this.baseUrl}/usuarios/${id}`);
  }

  actualizarUsuario(id: number, datos: any) {
    return this.http.put(`${this.baseUrl}/usuarios/${id}`, datos);
  }
}
