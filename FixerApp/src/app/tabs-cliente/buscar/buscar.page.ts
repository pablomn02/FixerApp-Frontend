import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarCalleService } from '../../shared/services/buscar-calle.service';
import { CategoryStyleService } from '../../shared/services/category-style.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: false
})
export class BuscarPage implements OnInit {
  palabras: string[] = [
    'Informático', 'Limpieza', 'Pintura', 'Reparación de bicicletas',
    'Electricista', 'Carpintería', 'Reparación', 'Fontanería',
    'Jardinería', 'Cerrajería', 'Albañilería', 'Decoración', 'Mudanzas',
    'Reparación de electrodomésticos', 'Mantenimiento de piscinas',
    'Cuidado de mascotas', 'Clases particulares', 'Asesoría legal',
    'Psicología', 'Traducción', 'Marketing digital', 'Diseño gráfico',
    'Fotografía', 'Videografía', 'Reparación de teléfonos', 'Limpieza de alfombras',
    'Reparación de muebles', 'Reparación de ventanas',
    'Reparación de tejados', 'Seguridad privada', 'Abogacía', 'Desarrollo web',
    'Estilismo de uñas', 'Barbería', 'Maquillaje', 'Asesoría financiera',
    'Personal shopper', 'Coaching personal', 'Consultoría empresarial',
    'Planificación de eventos', 'Reparación de cámaras', 'Reparación de relojes',
    'Cuidado de ancianos', 'Clases de música'
  ];

  palabraBuscada: string[] = [];
  direccion: string = '';

  constructor(
    private buscarCalleService: BuscarCalleService,
    private router: Router,
    private categoriaStyleService: CategoryStyleService
  ) {}

  ngOnInit() {
    this.palabraBuscada = this.palabras;
    this.obtenerUbicacion();

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

  navegarACategoria(category: any) {
    console.log(category)
    this.router.navigateByUrl(`/home/buscar/categoria/${category}`);
  }

  getIcon(category: string): string {
    return this.categoriaStyleService.getIcon(category);
  }

  getColor(category: string): string {
    return this.categoriaStyleService.getColor(category);
  }
}