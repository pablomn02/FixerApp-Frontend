// src/app/shared/services/favorito.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfesionalServicioSimple } from '../interfaces/profesional-servicio-simple';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FavoritoService {
  private baseUrl = '/api/clientes';

  constructor(private http: HttpClient) {}

  /** Devuelve el array de Profesionales favoritos del cliente */
  getFavoritos(clienteId: number): Observable<ProfesionalServicioSimple[]> {
    return this.http.get<ProfesionalServicioSimple[]>(
      `${this.baseUrl}/${clienteId}/favoritos`
    );
  }

  /** Añade un favorito y devuelve la lista actualizada */
  addFavorito(clienteId: number, profesionalId: number)
    : Observable<ProfesionalServicioSimple[]> {
    return this.http.post<ProfesionalServicioSimple[]>(
      `${this.baseUrl}/${clienteId}/favoritos/${profesionalId}`, {}
    );
  }

  /** Quita un favorito y devuelve la lista actualizada */
  removeFavorito(clienteId: number, profesionalId: number)
    : Observable<ProfesionalServicioSimple[]> {
    return this.http.delete<ProfesionalServicioSimple[]>(
      `${this.baseUrl}/${clienteId}/favoritos/${profesionalId}`
    );
  }
}
