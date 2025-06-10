import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfesionalServicioSimple } from '../interfaces/profesional-servicio-simple';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class FavoritoService {
  private baseUrl = environment.url + '/clientes';

  constructor(private http: HttpClient) {}

  getFavoritos(clienteId: number): Observable<ProfesionalServicioSimple[]> {
    return this.http.get<ProfesionalServicioSimple[]>(
      `${this.baseUrl}/${clienteId}/favoritos`
    );
  }

  addFavorito(clienteId: number, profesionalId: number): Observable<ProfesionalServicioSimple[]> {
    return this.http.post<ProfesionalServicioSimple[]>(
      `${this.baseUrl}/${clienteId}/favoritos/${profesionalId}`, {}
    );
  }

  removeFavorito(clienteId: number, profesionalId: number): Observable<ProfesionalServicioSimple[]> {
    return this.http.delete<ProfesionalServicioSimple[]>(
      `${this.baseUrl}/${clienteId}/favoritos/${profesionalId}`
    );
  }
}
