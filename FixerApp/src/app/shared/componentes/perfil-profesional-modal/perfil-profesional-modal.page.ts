import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { ProfesionalServicioSimple } from 'src/app/shared/interfaces/profesional-servicio-simple';
import { Valoracion } from '../../interfaces/valoracion';
import { ValoracionesService } from '../../services/valoraciones.service';

@Component({
  selector: 'app-perfil-profesional-modal',
  templateUrl: './perfil-profesional-modal.page.html',
  styleUrls: ['./perfil-profesional-modal.page.scss'],
  standalone: false
})
export class PerfilProfesionalModalPage implements OnInit {
  @Input() profesional!: ProfesionalServicioSimple;
  @Input() usuarioId!: number;
  Math = Math;

  isFavorito = false;
  cargandoFavorito = false;
  valoraciones: Valoracion[] = [];

  constructor(
    private modalCtrl: ModalController,
    private favoritoService: FavoritoService,
    private valoracionesService: ValoracionesService
  ) {}

  ngOnInit() {
    this.isFavorito = this.profesional.isFavorito;
    this.cargarValoraciones();
  }

  cargarValoraciones() {
    this.valoracionesService.getValoracionesByIdProfesional(this.profesional.idUsuario).subscribe({
      next: (data) => this.valoraciones = data,
      error: (err) => {
        console.error('Error al cargar valoraciones', err);
        this.valoraciones = [];
      }
    });
  }

  toggleFavorito() {
    if (this.cargandoFavorito) return;
    this.cargandoFavorito = true;

    const accion = this.isFavorito
      ? this.favoritoService.removeFavorito(this.usuarioId, this.profesional.idUsuario)
      : this.favoritoService.addFavorito(this.usuarioId, this.profesional.idUsuario);

    accion.subscribe({
      next: () => {
        this.isFavorito = !this.isFavorito;
        this.profesional.isFavorito = this.isFavorito;
        this.cargandoFavorito = false;
      },
      error: () => {
        this.cargandoFavorito = false;
      }
    });
  }

  closeModal(favoritoCambiado: boolean = false) {
    this.modalCtrl.dismiss(favoritoCambiado);
  }

  getStarIcon(star: number, rating: number): string {
    if (star <= Math.floor(rating)) {
      return 'star';
    } else if (star === Math.ceil(rating) && rating % 1 >= 0.3) {
      return 'star-half-outline';
    } else {
      return 'star-outline';
    }
  }
}