import { Component, OnInit } from '@angular/core';
import { Valoracion } from 'src/app/shared/interfaces/valoracion';
import { LoginService } from 'src/app/shared/services/login.service';
import { ValoracionesService } from 'src/app/shared/services/valoraciones.service';


@Component({
  selector: 'app-valoraciones',
  templateUrl: './valoraciones.page.html',
  styleUrls: ['./valoraciones.page.scss'],
  standalone: false
})
export class ValoracionesPage implements OnInit {

  valoraciones: Valoracion[] = [];
  profesionalId: number | null = null;

  constructor(
    private valoracionesService: ValoracionesService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    const idString = this.loginService.getUserId();
    this.profesionalId = idString ? parseInt(idString, 10) : null;

    if (this.profesionalId !== null) {
      this.obtenerValoraciones();
    } else {
      console.error('No se pudo obtener el ID del profesional desde localStorage.');
    }
  }

  obtenerValoraciones() {
    this.valoracionesService.getValoracionesByIdProfesional(this.profesionalId!).subscribe({
      next: (data) => this.valoraciones = data,
      error: (err) => console.error('Error al obtener valoraciones', err)
    });
  }
}
