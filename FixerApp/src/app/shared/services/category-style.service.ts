import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryStyleService {
  private iconMap: { [key: string]: string } = {
    'Informático': 'laptop-outline',
    'Limpieza': 'sparkles-outline',
    'Pintura': 'color-palette-outline',
    'Reparación de bicicletas': 'bicycle-outline',
    'Electricista': 'flash-outline',
    'Carpintería': 'hammer-outline',
    'Reparación': 'desktop-outline',
    'Fontanería': 'water-outline',
    'Jardinería': 'leaf-outline',
    'Cerrajería': 'key-outline',
    'Albañilería': 'construct-outline',
    'Decoración': 'flower-outline',
    'Mudanzas': 'cube-outline',
    'Reparación de electrodomésticos': 'settings-outline',
    'Mantenimiento de piscinas': 'water-outline',
    'Cuidado de mascotas': 'paw-outline',
    'Clases particulares': 'school-outline',
    'Asesoría legal': 'document-text-outline',
    'Psicología': 'heart-outline',
    'Traducción': 'language-outline',
    'Marketing digital': 'megaphone-outline',
    'Diseño gráfico': 'brush-outline',
    'Fotografía': 'camera-outline',
    'Videografía': 'videocam-outline',
    'Reparación de teléfonos': 'phone-portrait-outline',
    'Limpieza de alfombras': 'sparkles-outline',
    'Reparación de muebles': 'bed-outline',
    'Reparación de ventanas': 'cube-outline',
    'Reparación de tejados': 'home-outline',
    'Seguridad privada': 'shield-checkmark-outline',
    'Abogacía': 'briefcase-outline',
    'Desarrollo web': 'globe-outline',
    'Estilismo de uñas': 'cut-outline',
    'Barbería': 'scissors-outline',
    'Maquillaje': 'color-wand-outline',
    'Asesoría financiera': 'cash-outline',
    'Personal shopper': 'shirt-outline',
    'Coaching personal': 'people-outline',
    'Consultoría empresarial': 'business-outline',
    'Planificación de eventos': 'calendar-outline',
    'Reparación de cámaras': 'camera-outline',
    'Reparación de relojes': 'time-outline',
    'Cuidado de ancianos': 'person-outline',
    'Clases de música': 'musical-notes-outline'
  };

  private colorMap: { [key: string]: string } = {
    'Informático': '#1c6ae0',
    'Limpieza': '#4cc9f0',
    'Pintura': '#3a0ca3',
    'Reparación de bicicletas': '#f72585',
    'Electricista': '#4361ee',
    'Carpintería': '#7209b7',
    'Reparación': '#560bad',
    'Fontanería': '#1c6ae0',
    'Jardinería': '#2d6a4f',
    'Cerrajería': '#ff9e00',
    'Albañilería': '#6c757d',
    'Decoración': '#ff70a6',
    'Mudanzas': '#9d4edd',
    'Reparación de electrodomésticos': '#495057',
    'Mantenimiento de piscinas': '#00b4d8',
    'Cuidado de mascotas': '#ff006e',
    'Clases particulares': '#0077b6',
    'Asesoría legal': '#343a40',
    'Psicología': '#7209b7',
    'Traducción': '#48cae4',
    'Marketing digital': '#f48c06',
    'Diseño gráfico': '#7209b7',
    'Fotografía': '#606c38',
    'Videografía': '#283618',
    'Reparación de teléfonos': '#1c6ae0',
    'Limpieza de alfombras': '#4cc9f0',
    'Reparación de muebles': '#9d4edd',
    'Reparación de ventanas': '#6c757d',
    'Reparación de tejados': '#495057',
    'Seguridad privada': '#212529',
    'Abogacía': '#343a40',
    'Desarrollo web': '#1c6ae0',
    'Estilismo de uñas': '#ff70a6',
    'Barbería': '#ff006e',
    'Maquillaje': '#f72585',
    'Asesoría financiera': '#0077b6',
    'Personal shopper': '#ff9e00',
    'Coaching personal': '#7209b7',
    'Consultoría empresarial': '#343a40',
    'Planificación de eventos': '#ff70a6',
    'Reparación de cámaras': '#606c38',
    'Reparación de relojes': '#495057',
    'Cuidado de ancianos': '#7209b7',
    'Clases de música': '#f48c06'
  };

  getIcon(category: string): string {
    return this.iconMap[category] || 'construct-outline';
  }

  getColor(category: string): string {
    return this.colorMap[category] || '#1c6ae0';
  }
}