import { Component } from '@angular/core';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: false,
})
export class FavoritosPage {
  favorites = [
    { name: 'Juan Martínez', role: 'Fontanero' },
    { name: 'Sandra Sánchez', role: 'Pintora' },
    { name: 'Salvador Domínguez', role: 'Cocinero' },
    { name: 'Jesús Álvarez', role: 'Electricista' },
  ];

  constructor() {}

  contratar(favorite: any) {
    console.log(`Contratar de nuevo a ${favorite.name}`);
  }

  addFavorite() {
    console.log('Agregar cuentas favoritas');
  }
}