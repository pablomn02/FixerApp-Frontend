import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: false // No usamos standalone porque tienes un módulo
})
export class AgendaPage implements OnInit {
  citas: any[] = []; // Almacena todas las citas (datos simulados)
  citasFiltradas: any[] = []; // Almacena las citas filtradas
  filtroEstado: string = 'pendientes'; // Estado inicial del filtro

  constructor() {}

  ngOnInit() {
    // Datos simulados para pruebas
    this.citas = [
      {
        id: '1',
        clienteNombre: 'Ana Martínez',
        servicio: 'Electricista',
        fechaHora: '2025-04-22 10:00',
        estado: 'pendiente'
      },
      {
        id: '2',
        clienteNombre: 'Pedro Sánchez',
        servicio: 'Carpintero',
        fechaHora: '2025-04-20 14:00',
        estado: 'completada'
      },
      {
        id: '3',
        clienteNombre: 'Laura Gómez',
        servicio: 'Fontanero',
        fechaHora: '2025-04-25 09:00',
        estado: 'pendiente'
      }
    ];
    this.filtrarCitas();
  }

  // Filtrar citas según el estado seleccionado
  filtrarCitas() {
    this.citasFiltradas = this.citas.filter(
      cita => cita.estado.toLowerCase() === this.filtroEstado
    );
  }

  // Método simulado para cancelar (sin funcionalidad real)
  cancelarCita(cita: any) {
    console.log('Cancelar cita:', cita);
    cita.estado = 'cancelada'; // Cambia el estado localmente
    this.filtrarCitas();
  }
}