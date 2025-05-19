import { Component, OnInit } from '@angular/core';
import { ContratacionService } from 'src/app/shared/services/contratacion.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ContratacionDTO } from 'src/app/shared/interfaces/contratacion-dto';

@Component({
  selector: 'app-contrataciones',
  templateUrl: './contrataciones.page.html',
  styleUrls: ['./contrataciones.page.scss'],
  standalone: false
})
export class ContratacionesPage implements OnInit {

  contrataciones: ContratacionDTO[] = [];
  cargando = true;

  constructor(
    private contratacionService: ContratacionService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    console.log("Boricua")
    const userId = this.loginService.getUserId();
    if (!userId) return;

    this.contratacionService.obtenerContratacionesActivas(+userId).subscribe({
      next: (data) => {
        console.log(data)
        this.contrataciones = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar contrataciones', err);
        this.cargando = false;
      }
    });
  }
}
