import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryStyleService } from 'src/app/shared/services/category-style.service';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ServicioService } from 'src/app/shared/services/servicio.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
  standalone: false
})
export class CategoriaPage implements OnInit {
  idCategoria: string | null = null;
  categoriaNombre: string | null = null;
  servicios: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriaStyleService: CategoryStyleService,
    private categoriaService: CategoriaService,
    private servicioService: ServicioService,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.idCategoria = this.route.snapshot.paramMap.get('id');
    console.log('ID de la categoría:', this.idCategoria);

    if (this.idCategoria) {
      this.cargarCategoriaYServicios(this.idCategoria);
    }
  }

  goToServicio(id: number) {
    console.log('Cargando servicio con ID:', id);
    this.router.navigate(
      ['servicio', id],
      { relativeTo: this.route }
    );
  }

  cargarCategoriaYServicios(id: string) {
    this.categoriaService.getCategoriaById(+id).subscribe({
      next: (data) => {
        console.log('Categoría cargada:', data.nombre);
        this.categoriaNombre = data.nombre;
      },
      error: (err) => {
        console.error('Error al cargar categoría:', err);
        this.categoriaNombre = 'Categoría desconocida';
      }
    });

    this.servicioService.getServiciosByCategoria(+id).subscribe({
      next: (data) => {
        this.servicios = data;
        console.log('Servicios cargados:', data);
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
        this.servicios = [];
      }
    });
  }

  getIcon(category: string | null): string {
    return category ? this.categoriaStyleService.getIcon(category) : 'construct-outline';
  }

  getColor(category: string | null): string {
    return category ? this.categoriaStyleService.getColor(category) : '#1c6ae0';
  }
}