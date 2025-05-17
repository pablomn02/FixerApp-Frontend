import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfesionalServicioSimple } from '../interfaces/profesional-servicio-simple';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalServicioService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProfesionalesByServicio(idCategoria: number): Observable<ProfesionalServicioSimple[]> {
    return this.http.get<ProfesionalServicioSimple[]>(`${this.baseUrl}/profesionales/servicio/${idCategoria}`);
  }
}
