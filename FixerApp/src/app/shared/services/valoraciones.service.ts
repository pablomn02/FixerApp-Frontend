import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Valoracion } from '../interfaces/valoracion';

@Injectable({
  providedIn: 'root'
})
export class ValoracionesService {

  private baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  getValoracionesByIdProfesional(id: number): Observable<Valoracion[]> {
    return this.http.get<Valoracion[]>(`${this.baseUrl}/valoraciones/${id}`);
  }

  crearValoracion(valoracion: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/valoraciones/crear-valoracion`, valoracion);
  }

}
