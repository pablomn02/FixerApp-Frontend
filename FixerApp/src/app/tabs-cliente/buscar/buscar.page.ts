import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuscarCalleService } from '../../shared/services/buscar-calle.service';
import { CategoryStyleService } from '../../shared/services/category-style.service';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { Categoria } from 'src/app/shared/interfaces/categoria';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
  standalone: false
})
export class BuscarPage implements OnInit {
  listaCategorias: Categoria[] = [];
  categoriasFiltradas: Categoria[] = [];
  direccion: string = '';

  constructor(
    private buscarCalleService: BuscarCalleService,
    private router: Router,
    private categoriaStyleService: CategoryStyleService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit() {
    this.buscarCalleService.direccion$.subscribe((direccion: string) => {
      this.direccion = direccion;
    });
    this.getCategorias();
    this.obtenerUbicacion();
  }

  getCategorias() {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => {
        this.listaCategorias = data;
        this.categoriasFiltradas = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  searchBar(event: any) {
    const text = event.target.value.toLowerCase().trim();
    if (text && text !== '') {
      this.categoriasFiltradas = this.listaCategorias.filter((categoria) =>
        categoria.nombre.toLowerCase().includes(text)
      );
    } else {
      this.categoriasFiltradas = this.listaCategorias;
    }
  }

  async obtenerUbicacion() {
    await this.buscarCalleService.obtenerUbicacion();
  }

  navegarACategoria(idCategoria: number) {
    this.router.navigate(['/tabs-cliente/buscar/categoria', idCategoria]);
  }

  getIcon(category: string): string {
    return this.categoriaStyleService.getIcon(category);
  }

  getColor(category: string): string {
    return this.categoriaStyleService.getColor(category);
  }
}