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
  contratacionesFiltradasCliente: ContratacionDTO[] = [];
  filtroEstadoCliente: string = 'pendiente';
  cargando = true;

  constructor(
    private contratacionService: ContratacionService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.cargarContrataciones();
  }

  cargarContrataciones() {
    const userId = this.loginService.getUserId();
    if (!userId) return;

    this.contratacionService.obtenerContratacionesPorCliente(+userId).subscribe({
      next: (data) => {
        this.contrataciones = data;
        this.filtrarContratacionesCliente();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar contrataciones:', err);
        this.cargando = false;
      }
    });
  }

  filtrarContratacionesCliente() {
    this.contratacionesFiltradasCliente = this.contrataciones.filter(
      c => c.estadoContratacion?.toLowerCase() === this.filtroEstadoCliente
    );
  }
}
