import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ContratacionService } from 'src/app/shared/services/contratacion.service';
import { ContratacionCreateRequest } from 'src/app/shared/interfaces/contratacion-create-request';
import { DateTime } from 'luxon';

interface HoraChip {
  hora: string;
  ocupada: boolean;
}

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

  horasDisponibles: HoraChip[] = [];
  horasOcupadas: string[] = [];
  diaNoDisponible: boolean = false;
  mensajeError: string = '';
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
    const toast = await this.toastController.create({ message, duration: 2000, color, position: 'bottom' });
    await toast.present();
  }

  onFechaSeleccionada(event: any) {
    const fecha = event.detail.value;
    this.form.fecha = fecha;

    const fechaLocal = DateTime.fromISO(fecha, { zone: 'Europe/Madrid' });
    const diaSemana = fechaLocal.setLocale('es').toFormat('cccc').toLowerCase();

    this.generarHorasDisponibles(diaSemana);

    const fechaStr = fechaLocal.toISODate();
    if (!fechaStr) return;

    this.contratacionService.getHorasOcupadas(this.profesional.idProfesionalServicio, fechaStr).subscribe({
      next: (ocupadas) => {
        this.horasOcupadas = ocupadas;
        this.horasDisponibles = this.horasDisponibles.map(h => ({
          hora: h.hora,
          ocupada: this.horasOcupadas.includes(h.hora)
        }));
        this.diaNoDisponible = this.horasDisponibles.every(h => h.ocupada);
        this.validarFormulario();
      },
      error: (err) => {
        console.error('Error al obtener horas ocupadas:', err);
        this.horasOcupadas = [];
      }
    });
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

    let start = DateTime.fromObject({ hour: horaInicio, minute: minutoInicio });
    const end = DateTime.fromObject({ hour: horaFin, minute: minutoFin });

    while (start < end) {
      const horaStr = start.toFormat('HH:00');
      this.horasDisponibles.push({ hora: horaStr, ocupada: false });
      start = start.plus({ hours: 1 });
    }
  }

  seleccionarHora(hora: string) {
    const horaEstaOcupada = this.horasDisponibles.find(h => h.hora === hora)?.ocupada;
    if (horaEstaOcupada) return;
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

    const fechaHoraLocal = DateTime.fromISO(`${fechaStr}T${horaStr}`, { zone: 'Europe/Madrid' });
    const fechaHoraUTC = fechaHoraLocal.toUTC().toISO({ suppressMilliseconds: true });

    const nuevaContratacion: ContratacionCreateRequest = {
      idUsuario: this.usuarioId,
      idProfesionalServicio: this.profesional.idProfesionalServicio,
      fechaHora: fechaHoraUTC!,
      duracionEstimada: this.form.duracion || 60,
      costoTotal: this.calcularPrecioTotal()
    };

    this.contratacionService.crearContratacion(nuevaContratacion).subscribe({
      next: () => {
        this.presentToast('¡Contratación realizada exitosamente!');
        this.dismiss();
      },
      error: (error) => {
        console.error('Error al contratar:', error);
        this.presentToast('Error al realizar la contratación.', 'danger');
      }
    });
  }

  calcularPrecioTotal() {
    const precioHora = this.profesional?.precioHora || this.profesional?.precio || 0;
    return (this.form.duracion / 60) * precioHora;
  }
}
