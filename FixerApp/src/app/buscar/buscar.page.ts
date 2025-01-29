import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: false
})
export class BuscarPage implements OnInit {

  palabras: string[] = [
    'Limpieza', 
    'Pintura', 
    'Electricista', 
    'Carpintería', 
    'Fontanería', 
    'Jardinería', 
    'Cerrajería', 
    'Albañilería', 
    'Decoración', 
    'Mudanzas', 
    'Reparación de electrodomésticos', 
    'Mantenimiento de piscinas', 
    'Cuidado de mascotas', 
    'Clases particulares', 
    'Reparación de bicicletas',
    'Asesoría legal',
    'Psicología',
    'Traducción',
    'Marketing digital',
    'Diseño gráfico',
    'Fotografía',
    'Videografía',
    'Reparación de ordenadores',
    'Reparación de teléfonos',
    'Limpieza de alfombras',
    'Reparación de muebles',
    'Instalación de aire acondicionado',
    'Reparación de ventanas',
    'Reparación de tejados',
    'Seguridad privada',
    'Abogacía',
    'Desarrollo web',
    'SEO (Optimización en motores de búsqueda)',
    'Estilismo de uñas',
    'Corte de cabello',
    'Maquillaje',
    'Asesoría financiera',
    'Personal shopper',
    'Coaching personal',
    'Consultoría empresarial',
    'Planificación de eventos',
    'Reparación de cámaras',
    'Reparación de relojes',
    'Cuidado de ancianos',
    'Clases de música'
  ];

  palabraBuscada: string[] = [];

  constructor() { }

  ngOnInit() {
    this.palabraBuscada = this.palabras;
  }


  // Funcion de busqueda de servicios
  searchBar(event: any) {
    const text = event.target.value.toLowerCase().trim();
    if (text && text !== '') {
      this.palabraBuscada = this.palabras.filter((palabra) => {
        return palabra.toLowerCase().includes(text);
      });
    } else {
      this.palabraBuscada = this.palabras;
    }
  }
}
