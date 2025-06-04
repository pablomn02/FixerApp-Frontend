import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ValoracionesService } from 'src/app/shared/services/valoraciones.service';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-valoracion-modal',
  templateUrl: './valoracion-modal.page.html',
  styleUrls: ['./valoracion-modal.page.scss'],
  standalone: false
})
export class ValoracionModalPage implements OnInit {

  @Input() idContratacion!: number;
  @Input() idProfesional!: number;
  @Input() nombreProfesional!: string;

  valoracion: number = 5;
  comentario: string = '';

  constructor(
    private modalCtrl: ModalController,
    private valoracionesService: ValoracionesService,
    private loginService: LoginService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  cancelar() {
    this.modalCtrl.dismiss();
  }

  async enviarValoracion() {
    const clienteId = this.loginService.getUserId();

  const nuevaValoracion = {
    idCliente: clienteId,
    idProfesional: this.idProfesional,
    idContratacion: this.idContratacion,
    puntuacion: this.valoracion,
    comentario: this.comentario
  };

    this.valoracionesService.crearValoracion(nuevaValoracion).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: '¡Valoración enviada con éxito!',
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.modalCtrl.dismiss({
          valorada: true,
          idContratacion: this.idContratacion
        });
      },
      error: async (err) => {
        console.error('Error al enviar valoración:', err);
        const toast = await this.toastCtrl.create({
          message: 'Error al enviar la valoración.',
          duration: 2000,
          color: 'danger'
        });
        await toast.present();
      }
    });
  }
}
