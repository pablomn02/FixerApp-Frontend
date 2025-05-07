import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContratacionCreateRequest } from '../interfaces/contratacion-create-request';

@Injectable({ providedIn: 'root' })
export class ContratacionService {
  private apiUrl = 'http://localhost:8080/contrataciones';

  constructor(private http: HttpClient) {}

  crearContratacion(data: ContratacionCreateRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
