import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryStyleService {
  private iconMap: { [key: string]: string } = {
    'Hogar': 'home-outline',
    'Educación': 'school-outline',
    'Salud': 'medkit-outline',
    'Tecnología': 'laptop-outline',
    'Construcción': 'hammer-outline',
    'Belleza': 'color-wand-outline',
    'Mascotas': 'paw-outline',
    'Eventos': 'balloon-outline',
    'Automoción': 'car-outline',
    'Consultoría': 'briefcase-outline',
    'Arte': 'brush-outline',
    'Jardinería': 'leaf-outline',
    'Seguridad': 'shield-checkmark-outline',
    'Reparaciones': 'settings-outline',
    'Limpieza': 'sparkles-outline'
  };

  private colorMap: { [key: string]: string } = {
    'Hogar': '#6c757d',
    'Educación': '#0077b6',
    'Salud': '#00b4d8',
    'Tecnología': '#1c6ae0',
    'Construcción': '#7209b7',
    'Belleza': '#ff70a6',
    'Mascotas': '#f4a261',
    'Eventos': '#f48c06',
    'Automoción': '#495057',
    'Consultoría': '#343a40',
    'Arte': '#f72585',
    'Jardinería': '#2d6a4f',
    'Seguridad': '#212529',
    'Reparaciones': '#560bad',
    'Limpieza': '#4ea8de'
  };

  getIcon(category: string): string {
    return this.iconMap[category] || 'help-outline';
  }

  getColor(category: string): string {
    return this.colorMap[category] || '#1c6ae0';
  }
}