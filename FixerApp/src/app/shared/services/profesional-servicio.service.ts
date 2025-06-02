import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfesionalServicioSimple } from '../interfaces/profesional-servicio-simple';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProfesionalServicioService {

  private baseUrl = environment.url;

  constructor(private http: HttpClient) {}

  getProfesionalesByServicio(idCategoria: number): Observable<ProfesionalServicioSimple[]> {
    return this.http.get<ProfesionalServicioSimple[]>(`${this.baseUrl}/profesionales/servicio/${idCategoria}`);
  }

  getIdProfesionalServicio(profesionalId: number, servicioId: number) {
    const params = {
      profesionalId: profesionalId.toString(),
      servicioId: servicioId.toString()
    };
    return this.http.get<number>(environment.url + `/id`, { params });
  }
}
