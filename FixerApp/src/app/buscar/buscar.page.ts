import { Component, OnInit } from '@angular/core';
import { BuscarCalleService } from '../shared/services/buscar-calle.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: false
})
export class BuscarPage implements OnInit {

  palabras: string[] = [
    'Técnico Informático', 'Limpieza', 'Pintura', 'Reparación de bicicletas',
    'Electricista', 'Carpintería', 'Reparación de ordenadores', 'Fontanería',
    'Jardinería', 'Cerrajería', 'Albañilería', 'Decoración', 'Mudanzas',
    'Reparación de electrodomésticos', 'Mantenimiento de piscinas',
    'Cuidado de mascotas', 'Clases particulares', 'Asesoría legal',
    'Psicología', 'Traducción', 'Marketing digital', 'Diseño gráfico',
    'Fotografía', 'Videografía', 'Reparación de teléfonos', 'Limpieza de alfombras',
    'Reparación de muebles', 'Instalación de aire acondicionado', 'Reparación de ventanas',
    'Reparación de tejados', 'Seguridad privada', 'Abogacía', 'Desarrollo web',
    'Estilismo de uñas', 'Corte de cabello', 'Maquillaje', 'Asesoría financiera',
    'Personal shopper', 'Coaching personal', 'Consultoría empresarial',
    'Planificación de eventos', 'Reparación de cámaras', 'Reparación de relojes',
    'Cuidado de ancianos', 'Clases de música'
  ];

  palabraBuscada: string[] = [];
  direccion: string = '';

  constructor(private buscarCalleService: BuscarCalleService) {}

  ngOnInit() {
    this.palabraBuscada = this.palabras;
    this.obtenerUbicacion()

    // Suscribirse al observable de la dirección
    this.buscarCalleService.direccion$.subscribe((direccion: string) => {
      this.direccion = direccion;
    });
  }

  searchBar(event: any) {
    const text = event.target.value.toLowerCase().trim();
    if (text && text !== '') {
      this.palabraBuscada = this.palabras.filter((palabra) =>
        palabra.toLowerCase().includes(text)
      );
    } else {
      this.palabraBuscada = this.palabras;
    }
  }

  async obtenerUbicacion() {
    await this.buscarCalleService.obtenerUbicacion();
  }
}
