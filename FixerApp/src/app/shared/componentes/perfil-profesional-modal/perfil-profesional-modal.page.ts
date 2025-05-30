import { Component, Input, OnInit } from '@angular/core';
import { ModalController }            from '@ionic/angular';
import { FavoritoService }            from 'src/app/shared/services/favorito.service';
import { ProfesionalServicioSimple }  from 'src/app/shared/interfaces/profesional-servicio-simple';

@Component({
  selector: 'app-perfil-profesional-modal',
  templateUrl: './perfil-profesional-modal.page.html',
  styleUrls: ['./perfil-profesional-modal.page.scss'],
  standalone: false
})
export class PerfilProfesionalModalPage implements OnInit {
  @Input() profesional!: ProfesionalServicioSimple;
  @Input() usuarioId!: number;

  isFavorito        = false;
  cargandoFavorito  = true;

  constructor(
    private modalCtrl: ModalController,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit() {
    this.checkFavorito();
  }

  private checkFavorito() {
    this.favoritoService.getFavoritos(this.usuarioId)
      .subscribe({
        next: favs => {
          this.isFavorito = favs.some(p => p.idUsuario === this.profesional.idUsuario);
          this.cargandoFavorito = false;
        },
        error: () => {
          this.cargandoFavorito = false;
        }
      });
  }

  toggleFavorito() {
    if (this.cargandoFavorito) return;
    this.cargandoFavorito = true;

    const accion = this.isFavorito
      ? this.favoritoService.removeFavorito(this.usuarioId, this.profesional.idUsuario)
      : this.favoritoService.addFavorito  (this.usuarioId, this.profesional.idUsuario);

    accion.subscribe({
      next: () => {
        this.isFavorito       = !this.isFavorito;
        this.cargandoFavorito = false;
      },
      error: () => {
        this.cargandoFavorito = false;
      }
    });
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
}
