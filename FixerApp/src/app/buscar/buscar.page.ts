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
    'Reparación de bicicletas'
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
