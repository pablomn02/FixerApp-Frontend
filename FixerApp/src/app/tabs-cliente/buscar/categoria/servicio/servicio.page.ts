import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/shared/services/servicio.service';
import { ProfesionalServicioService } from 'src/app/shared/services/profesional-servicio.service';
import { ContratacionService } from 'src/app/shared/services/contratacion.service';
import { Profesional } from 'src/app/shared/interfaces/profesional';
import { ContratacionCreateRequest } from 'src/app/shared/interfaces/contratacion-create-request';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: false
})
export class ServicioPage implements OnInit {
  servicio: any;
  profesionales: Profesional[] = [];

  modalAbierto: boolean = false;
  profesionalSeleccionado: any = null;
  form: any = {
    fechaHora: '',
    duracion: 60,
    comentario: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private profServService: ProfesionalServicioService,
    private contratacionService: ContratacionService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicioService.getServiciosByCategoria(id).subscribe(s => (this.servicio = s));
    this.profServService.getProfesionalesByServicio(id)
      .subscribe(ps => (this.profesionales = ps));
  }

  abrirPerfil(prof: Profesional) {
    this.router.navigate(['/perfil-profesional', prof.id]);
  }

  contratar(event: Event, profesional: any) {
    event.stopPropagation();
    this.profesionalSeleccionado = profesional;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.form = {
      fechaHora: '',
      duracion: 60,
      comentario: ''
    };
  }

  confirmarContratacion() {
    const horas = this.form.duracion / 60;
    const costoTotal = parseFloat((horas * this.profesionalSeleccionado.precioHora).toFixed(2));

    const nuevaContratacion: ContratacionCreateRequest = {
      idUsuario: 1,
      idProfesionalServicio: this.profesionalSeleccionado.id,
      fechaHora: this.form.fechaHora,
      duracionEstimada: this.form.duracion,
      costoTotal: costoTotal
    };

    this.contratacionService.crearContratacion(nuevaContratacion).subscribe({
      next: response => {
        console.log('Contratación enviada con éxito:', response);
        this.cerrarModal();
      },
      error: err => {
        console.error('Error al contratar:', err);
      }
    });
  }
}
