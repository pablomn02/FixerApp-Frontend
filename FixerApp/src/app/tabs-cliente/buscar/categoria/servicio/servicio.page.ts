import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }    from '@angular/router';
import { ModalController }   from '@ionic/angular';
import { ServicioService }   from 'src/app/shared/services/servicio.service';
import { ProfesionalServicioService } from 'src/app/shared/services/profesional-servicio.service';
import { ContratarModalPage } from 'src/app/shared/componentes/contratar-modal/contratar-modal.page';
import { ProfesionalServicioSimple } from 'src/app/shared/interfaces/profesional-servicio-simple';
import { PerfilProfesionalModalPage } from 'src/app/shared/componentes/perfil-profesional-modal/perfil-profesional-modal.page';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
  standalone: false
})
export class ServicioPage implements OnInit {
  servicio: any;
  profesionales: ProfesionalServicioSimple[] = [];
  usuarioIdLogueado!: number;

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private profServService: ProfesionalServicioService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    const idCat = this.route.snapshot.paramMap.get('id');
    if (idCat) {
      const id = Number(idCat);
      this.servicioService.getServiciosByCategoria(id)
        .subscribe(s => this.servicio = s);
      this.profServService.getProfesionalesByServicio(id)
        .subscribe(ps => this.profesionales = ps);
    }

    const idGuardado = localStorage.getItem('idUsuario');
    if (idGuardado) {
      this.usuarioIdLogueado = Number(idGuardado);
    } else {
      console.error('No se encontró el idUsuario en localStorage');
    }
  }

  /** Abre modal de perfil de profesional */
  async abrirPerfil(event: Event, prof: ProfesionalServicioSimple) {
    event.stopPropagation();
    const modal = await this.modalController.create({
      component: PerfilProfesionalModalPage,
      componentProps: {
        profesional: prof,
        usuarioId: this.usuarioIdLogueado
      },
      cssClass: 'perfil-modal'
    });
    await modal.present();
  }

  /** Abre modal para contratar */
  async contratar(event: Event, profesional: ProfesionalServicioSimple) {
    event.stopPropagation();
    const modal = await this.modalController.create({
      component: ContratarModalPage,
      componentProps: {
        profesional: profesional,
        usuarioId: this.usuarioIdLogueado
      },
      cssClass: 'classic-modal'
    });
    await modal.present();
  }
}
