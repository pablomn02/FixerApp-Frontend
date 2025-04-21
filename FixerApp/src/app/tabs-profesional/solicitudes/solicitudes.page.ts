import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
  standalone: false // No usamos standalone porque tienes un módulo
})
export class SolicitudesPage implements OnInit {
  solicitudes: any[] = []; // Almacena todas las solicitudes (datos simulados)
  solicitudesFiltradas: any[] = []; // Almacena las solicitudes filtradas
  filtroEstado: string = 'pendientes'; // Estado inicial del filtro

  constructor() {}

  ngOnInit() {
    // Datos simulados para pruebas
    this.solicitudes = [
      {
        id: '1',
        clienteNombre: 'Juan Pérez',
        servicio: 'Electricista',
        fechaHora: '2025-04-22 10:00',
        mensaje: 'Necesito reparar un enchufe en mi casa.',
        estado: 'pendiente'
      },
      {
        id: '2',
        clienteNombre: 'María López',
        servicio: 'Carpintero',
        fechaHora: '2025-04-23 14:00',
        mensaje: 'Quiero un mueble a medida.',
        estado: 'aceptada'
      },
      {
        id: '3',
        clienteNombre: 'Carlos Gómez',
        servicio: 'Fontanero',
        fechaHora: '2025-04-24 09:00',
        mensaje: 'Tengo una fuga en la cocina.',
        estado: 'rechazada'
      }
    ];
    this.filtrarSolicitudes();
  }

  // Filtrar solicitudes según el estado seleccionado
  filtrarSolicitudes() {
    this.solicitudesFiltradas = this.solicitudes.filter(
      solicitud => solicitud.estado.toLowerCase() === this.filtroEstado
    );
  }

  // Métodos simulados para aceptar y rechazar (sin funcionalidad real)
  aceptarSolicitud(solicitud: any) {
    console.log('Aceptar solicitud:', solicitud);
    solicitud.estado = 'aceptada';
    this.filtrarSolicitudes();
  }

  rechazarSolicitud(solicitud: any) {
    console.log('Rechazar solicitud:', solicitud);
    solicitud.estado = 'rechazada';
    this.filtrarSolicitudes();
  }
}