import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';
import { Servicio } from '../interfaces/servicio';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

    private baseUrl = environment.url;
  
    constructor(private http: HttpClient) { }
  
    public getServiciosByCategoria(idCategoria: number) {
      return this.http.get<Servicio[]>(`${this.baseUrl}/servicios/` + idCategoria);
    }
}
