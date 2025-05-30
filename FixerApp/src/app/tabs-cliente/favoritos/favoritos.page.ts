import { Component, OnInit } from '@angular/core';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { ProfesionalServicioSimple } from 'src/app/shared/interfaces/profesional-servicio-simple';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage implements OnInit {
  favorites: ProfesionalServicioSimple[] = [];
  usuarioIdLogueado!: number;

  constructor(private favoritoService: FavoritoService) {}

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('idUsuario');
    if (idGuardado) {
      this.usuarioIdLogueado = Number(idGuardado);
      this.cargarFavoritos();
    } else {
      console.error('No se encontró el idUsuario en localStorage');
    }
  }

  cargarFavoritos() {
    this.favoritoService.getFavoritos(this.usuarioIdLogueado).subscribe({
      next: (data) => {
        this.favorites = data;
      },
      error: (err) => {
        console.error('Error al obtener favoritos:', err);
      }
    });
  }

  contratar(favorite: ProfesionalServicioSimple) {
    console.log(`Contratar de nuevo a ${favorite.nombre}`);
    // Aquí podrías abrir el modal de contratación como en otros componentes
  }

  addFavorite() {
    console.log('Agregar cuentas favoritas');
    // Aquí podrías navegar a la vista para buscar profesionales
  }
}
