import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryStyleService } from 'src/app/shared/services/category-style.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: false
})
export class CategoriaPage implements OnInit {
  idCategoria: string | null = null;
  categoriaNombre: string | null = null; // Para almacenar el nombre de la categoría

  constructor(
    private route: ActivatedRoute,
    private categoriaStyleService: CategoryStyleService
  ) {}

  ngOnInit() {
    // Obtener el parámetro 'id' (no 'idCategoria')
    this.idCategoria = this.route.snapshot.paramMap.get('id');
    console.log('ID de la categoría:', this.idCategoria);

    // Cargar el nombre de la categoría (puedes usar un servicio o un mapa estático)
    this.categoriaNombre = this.getCategoriaNombre(this.idCategoria);
  }

  // Método para obtener el nombre de la categoría basado en el ID
  // Esto es un ejemplo; en una app real, deberías usar un servicio para obtener el nombre
  getCategoriaNombre(id: string | null): string | null {
    const categoriaMap: { [key: string]: string } = {
      '1': 'Electricistas',
      '2': 'Fontaneros',
      '3': 'Carpinteros'
    };
    return id ? categoriaMap[id] || 'Categoría desconocida' : null;
  }

  // Obtener el ícono basado en el nombre de la categoría
  getIcon(category: string | null): string {
    return category ? this.categoriaStyleService.getIcon(category) : 'construct-outline';
  }
}