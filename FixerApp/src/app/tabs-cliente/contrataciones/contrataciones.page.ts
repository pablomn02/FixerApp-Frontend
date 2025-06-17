import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

import { ContratacionService } from 'src/app/shared/services/contratacion.service';
import { LoginService } from 'src/app/shared/services/login.service';
import { ContratacionDTO } from 'src/app/shared/interfaces/contratacion-dto';
import { ValoracionModalPage } from 'src/app/shared/componentes/valoracion-modal/valoracion-modal.page';

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
    private loginService: LoginService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    window
    this.cargarContrataciones();
  }

  cargarContrataciones() {
    const userId = this.loginService.getUserId();
    if (!userId) return;

    this.contratacionService.obtenerContratacionesPorCliente(+userId).subscribe({
      next: (data) => {
        this.contrataciones = data;
        console.log('Contrataciones cargadas:', this.contrataciones.map(c => c.fechaHora));
        this.filtrarContratacionesCliente();
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar contrataciones:', err);
        this.cargando = false;
      }
    });
  }

  // Ordenadas por fecha reciente
  filtrarContratacionesCliente() {
    this.contratacionesFiltradasCliente = this.contrataciones
      .filter(c => c.estadoContratacion?.toLowerCase() === this.filtroEstadoCliente)
      .sort((a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime());
  }

  async abrirValoracion(contratacion: ContratacionDTO) {
    const modal = await this.modalCtrl.create({
      component: ValoracionModalPage,
      componentProps: {
        idContratacion: contratacion.idContratacion,
        idProfesional: contratacion.idProfesional,
        nombreProfesional: contratacion.nombreProfesional
      }
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data?.valorada && data.idContratacion) {
        const encontrada = this.contrataciones.find(
          c => c.idContratacion === data.idContratacion
        );
        if (encontrada) {
          encontrada.yaValorada = true;
          this.filtrarContratacionesCliente();
        }
      }
    });

    await modal.present();
  }

}