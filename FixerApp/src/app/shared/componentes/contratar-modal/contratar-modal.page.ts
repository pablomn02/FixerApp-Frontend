import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ContratacionService } from 'src/app/shared/services/contratacion.service';
import { ContratacionCreateRequest } from 'src/app/shared/interfaces/contratacion-create-request';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-contratar-modal',
  templateUrl: './contratar-modal.page.html',
  styleUrls: ['./contratar-modal.page.scss'],
  standalone: false
})
export class ContratarModalPage implements OnInit {

  @Input() profesional: any;
  @Input() usuarioId!: number;

  form: any = {
    fecha: '', 
    horaSeleccionada: '',
    duracion: 60
  };

  horasDisponibles: string[] = [];
  horasOcupadas: string[] = [];
  diaNoDisponible: boolean = false;
  mensajeError: string = "";
  botonDeshabilitado: boolean = true;
  minDate: string = new Date().toISOString();

  constructor(
    private modalController: ModalController,
    private contratacionService: ContratacionService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    if (typeof this.profesional?.horarioDisponible === 'string') {
      try {
        this.profesional.horarioDisponible = JSON.parse(this.profesional.horarioDisponible);
      } catch (error) {
        console.error('Error al parsear horarioDisponible:', error);
      }
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }

  onFechaSeleccionada(event: any) {
    const fecha = event.detail.value;
    this.form.fecha = fecha;

    const fechaLocal = DateTime.fromISO(fecha, { zone: 'Europe/Madrid' });
    const diaSemana = fechaLocal.setLocale('es').toFormat('cccc').toLowerCase();

    this.generarHorasDisponibles(diaSemana);
    this.validarFormulario();
  }

  generarHorasDisponibles(diaSemana: string) {
    this.horasDisponibles = [];
    this.diaNoDisponible = false;

    const horarioDelDia = this.profesional?.horarioDisponible?.[diaSemana];
    if (!horarioDelDia || horarioDelDia.length === 0) {
      this.diaNoDisponible = true;
      return;
    }

    const rango = horarioDelDia[0];
    const [horaInicio, minutoInicio] = rango.inicio.split(':').map(Number);
    const [horaFin, minutoFin] = rango.fin.split(':').map(Number);

    let start = DateTime.fromObject({ hour: horaInicio, minute: minutoInicio, second: 0 });
    const end = DateTime.fromObject({ hour: horaFin, minute: minutoFin, second: 0 });

    while (start < end) {
      this.horasDisponibles.push(start.toFormat('HH:mm'));
      start = start.plus({ minutes: 30 });
    }
  }

  seleccionarHora(hora: string) {
    this.form.horaSeleccionada = hora;
    this.validarFormulario();
  }

  validarFormulario() {
    this.botonDeshabilitado = !(this.form.fecha && this.form.horaSeleccionada);
  }

  confirmarContratacion() {
    if (!this.form.fecha || !this.form.horaSeleccionada) {
      this.mensajeError = "Selecciona una fecha y hora válidas.";
      return;
    }

    const fechaStr = this.form.fecha?.split('T')[0];
    const horaStr = this.form.horaSeleccionada;

    if (!fechaStr || !horaStr) {
      this.mensajeError = "Fecha u hora inválida.";
      return;
    }

    const fechaHoraLocal = DateTime.fromISO(`${fechaStr}T${horaStr}`, {
      zone: 'Europe/Madrid'
    });


    if (!fechaHoraLocal.isValid) {
      this.mensajeError = "Fecha y hora inválidas.";
      return;
    }

    const fechaHoraUTC = fechaHoraLocal.toUTC().toISO({ suppressMilliseconds: true });
    console.log("Fecha-hora en UTC a enviar:", fechaHoraUTC);


    if (!fechaHoraUTC) {
      this.mensajeError = "Error al procesar la fecha y hora seleccionada.";
      return;
    }

    const nuevaContratacion: ContratacionCreateRequest = {
      idUsuario: this.usuarioId,
      idProfesionalServicio: this.profesional.idProfesionalServicio,
      fechaHora: fechaHoraUTC,
      duracionEstimada: this.form.duracion || 60,
      costoTotal: 0
    };

    this.contratacionService.crearContratacion(nuevaContratacion).subscribe({
      next: (response) => {
        console.log('Contratación realizada:', response);
        this.presentToast('¡Contratación realizada exitosamente!', 'success');
        this.dismiss();
      },
      error: (error) => {
        console.error(' Error al contratar:', error);
        this.presentToast('Error al realizar la contratación.', 'danger');
      }
    });
  }
}
