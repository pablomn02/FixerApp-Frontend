import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratacionCreateRequest } from '../interfaces/contratacion-create-request';

@Injectable({
  providedIn: 'root'
})
export class ContratacionService {

  private baseUrl = 'http://localhost:8080'; // Ajusta según tu entorno

  constructor(private http: HttpClient) {}

  crearContratacion(contratacion: ContratacionCreateRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/contrataciones`, contratacion);
  }

  getHorasOcupadas(idProfesionalServicio: number, fecha: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/contrataciones/ocupadas/${idProfesionalServicio}/${fecha}`);
  }
}
