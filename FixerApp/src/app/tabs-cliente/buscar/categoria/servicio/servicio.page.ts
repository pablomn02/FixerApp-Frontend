import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicioService } from 'src/app/shared/services/servicio.service';
import { ProfesionalServicioService } from 'src/app/shared/services/profesional-servicio.service';
import { Profesional } from 'src/app/shared/interfaces/profesional';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: false
})
export class ServicioPage implements OnInit {
  servicio: any;
  profesionales: Profesional[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private profServService: ProfesionalServicioService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.servicioService.getServiciosByCategoria(id).subscribe(s => (this.servicio = s));
    this.profServService.getProfesionalesByServicio(id)
      .subscribe(ps => (this.profesionales = ps));
  }

  abrirPerfil(prof: Profesional) {
    console.log(prof.id)
    this.router.navigate(['/perfil-profesional', prof.id]);
  }
}
