import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ServicioService } from 'src/app/shared/services/servicio.service';
import { Categoria } from 'src/app/shared/interfaces/categoria';
import { Servicio } from 'src/app/shared/interfaces/servicio';

@Component({
  selector: 'app-seleccionar-servicio-modal',
  templateUrl: './seleccionar-servicio-modal.page.html',
  styleUrls: ['./seleccionar-servicio-modal.page.scss'],
  standalone: false
})
export class SeleccionarServicioModalPage {
  categorias: Categoria[] = [];
  serviciosPorCategoria: { [idCategoria: number]: Servicio[] } = {};
  categoriaExpandidaId: number | null = null;
  searchTerm: string = '';

  constructor(
    private modalController: ModalController,
    private categoriaService: CategoriaService,
    private servicioService: ServicioService
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.categoriaService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }

  toggleCategoria(categoria: Categoria) {
    if (this.categoriaExpandidaId === categoria.id) {
      this.categoriaExpandidaId = null;
    } else {
      this.categoriaExpandidaId = categoria.id;

      if (!this.serviciosPorCategoria[categoria.id]) {
        this.servicioService.getServiciosByCategoria(categoria.id).subscribe((data) => {
          this.serviciosPorCategoria[categoria.id] = data;
        });
      }
    }
  }

  seleccionarServicio(servicio: Servicio) {
    this.modalController.dismiss({
      nombreServicioSeleccionado: servicio.nombre,
      idServicioSeleccionado: servicio.id
    });
  }

  agregarNuevoServicio() {
    if (this.searchTerm.trim().length === 0) {
      return;
    }
    this.modalController.dismiss({
      nombreServicioSeleccionado: this.searchTerm.trim(),
      idServicioSeleccionado: null
    });
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
}
