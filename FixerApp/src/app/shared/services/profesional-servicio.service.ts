import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Profesional } from '../interfaces/profesional';

@Injectable({ providedIn: 'root' })
export class ProfesionalServicioService {
  private baseUrl = 'http://localhost:8080/servicios';

  constructor(private http: HttpClient) {}

  getProfesionalesByServicio(idServicio: number): Observable<Profesional[]> {
    return this.http.get<Profesional[]>(
      `${this.baseUrl}/${idServicio}/profesionales`
    );
  }
}
