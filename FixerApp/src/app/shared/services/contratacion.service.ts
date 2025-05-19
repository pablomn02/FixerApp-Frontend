import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratacionCreateRequest } from '../interfaces/contratacion-create-request';
import { Contratacion } from '../interfaces/contratacion';
import { ContratacionDTO } from '../interfaces/contratacion-dto';

@Injectable({
  providedIn: 'root'
})
export class ContratacionService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  crearContratacion(contratacion: ContratacionCreateRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/contrataciones`, contratacion);
  }

  getHorasOcupadas(idProfesionalServicio: number, fecha: string) {
    return this.http.get<string[]>(
      `${this.baseUrl}/horas-ocupadas?idProfesionalServicio=${idProfesionalServicio}&fecha=${fecha}`
    );
  }

  obtenerContratacionesActivas(idUsuario: number) {
    return this.http.get<ContratacionDTO[]>(`${this.baseUrl}/contrataciones/usuario/${idUsuario}`);
  }

  obtenerContratacionesPorProfesional(idProfesional: number): Observable<ContratacionDTO[]> {
    return this.http.get<ContratacionDTO[]>(`${this.baseUrl}/profesionales/${idProfesional}/contrataciones`);
  }

  modificarEstado(idContratacion: number, nuevoEstado: string): Observable<string> {
    return this.http.put(`${this.baseUrl}/contrataciones/${idContratacion}/modificarEstadoContratacion`, null, {
      params: { nuevoEstado },
      responseType: 'text'
    });
  }

}
