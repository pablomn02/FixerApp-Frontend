import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';
import { Servicio } from '../interfaces/servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

    private baseUrl = 'http://localhost:8080';
  
    constructor(private http: HttpClient) { }
  
    public getServiciosByCategoria(idCategoria: number) {
      return this.http.get<Servicio[]>(`${this.baseUrl}/servicios/` + idCategoria);
    }
}
