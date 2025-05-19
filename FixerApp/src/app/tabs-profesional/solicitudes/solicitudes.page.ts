import { Component, OnInit } from '@angular/core';
import { ContratacionService } from 'src/app/shared/services/contratacion.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ContratacionDTO } from 'src/app/shared/interfaces/contratacion-dto';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
  standalone: false
})
export class SolicitudesPage implements OnInit {
  contrataciones: ContratacionDTO[] = [];
  contratacionesFiltradas: ContratacionDTO[] = [];
  filtroEstado: string = 'pendiente';

  constructor(
    private contratacionService: ContratacionService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    const idProfesional = this.loginService.getUserId();
    if (!idProfesional) return;

    this.contratacionService.obtenerContratacionesPorProfesional(+idProfesional).subscribe({
      next: (data) => {
        console.log(data)
        this.contrataciones = data;
        this.filtrarContrataciones();
      },
      error: (err) => console.error('Error al obtener contrataciones:', err)
    });
  }

  filtrarContrataciones() {
    this.contratacionesFiltradas = this.contrataciones.filter(
      c => c.estadoContratacion?.toLowerCase() === this.filtroEstado
    );
  }

  aceptarSolicitud(contratacion: ContratacionDTO) {
    const id = contratacion.idContratacion;
    this.contratacionService.modificarEstado(id, 'ACEPTADA').subscribe({
      next: () => {
        contratacion.estadoContratacion = 'ACEPTADA';
        this.filtrarContrataciones();
      },
      error: (err) => console.error('Error al aceptar solicitud:', err)
    });
  }

  rechazarSolicitud(contratacion: ContratacionDTO) {
    const id = contratacion.idContratacion;
    this.contratacionService.modificarEstado(id, 'COMPLETADA').subscribe({
      next: () => {
        contratacion.estadoContratacion = 'COMPLETADA';
        this.filtrarContrataciones();
      },
      error: (err) => console.error('Error al rechazar solicitud:', err)
    });
  }

  marcarComoCompletada(contratacion: ContratacionDTO) {
    const id = contratacion.idContratacion;
    this.contratacionService.modificarEstado(id, 'COMPLETADA').subscribe({
      next: () => {
        contratacion.estadoContratacion = 'COMPLETADA';
        this.filtrarContrataciones();
      },
      error: (err) => console.error('Error al marcar como completada:', err)
    });
  }
}
