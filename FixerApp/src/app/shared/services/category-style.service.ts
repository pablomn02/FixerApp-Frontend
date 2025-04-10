import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryStyleService {
  private iconMap: { [key: string]: string } = {
    'Hogar': 'construct-outline',
    'Belleza': 'color-wand-outline',
    'Educación': 'school-outline',
    'Tecnología': 'laptop-outline',
    'Transporte': 'cube-outline',
    'Jardinería': 'leaf-outline',
    'Construcción': 'hammer-outline',
    'Cuidado': 'heart-outline',
    'Creatividad': 'calendar-outline',
    'Profesional': 'briefcase-outline',
    'Salud': 'medkit-outline',
    'Automoción': 'car-outline',
    'Hostelería': 'restaurant-outline',
    'Seguridad': 'shield-checkmark-outline',
    'Reparaciones': 'settings-outline'
  };

  private colorMap: { [key: string]: string } = {
    'Hogar': '#6c757d',
    'Belleza': '#ff70a6',
    'Educación': '#0077b6',
    'Tecnología': '#1c6ae0',
    'Transporte': '#9d4edd',
    'Jardinería': '#2d6a4f',
    'Construcción': '#7209b7',
    'Cuidado': '#ff006e',
    'Creatividad': '#f48c06',
    'Profesional': '#343a40',
    'Salud': '#00b4d8',
    'Automoción': '#495057',
    'Hostelería': '#f72585',
    'Seguridad': '#212529',
    'Reparaciones': '#560bad'
  };

  getIcon(category: string): string {
    return this.iconMap[category] || 'construct-outline';
  }

  getColor(category: string): string {
    return this.colorMap[category] || '#1c6ae0';
  }
}