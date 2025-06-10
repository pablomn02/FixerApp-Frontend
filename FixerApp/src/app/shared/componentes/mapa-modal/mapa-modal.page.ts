import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa-modal',
  templateUrl: './mapa-modal.page.html',
  styleUrls: ['./mapa-modal.page.scss'],
  standalone: false
})
export class MapaModalPage implements OnInit, AfterViewInit {
  @ViewChild('map') mapContainer!: ElementRef;
  private map!: L.Map;
  selectedCoordinates: { lat: number; lng: number } | null = null;
  private marker: L.Marker | null = null;
  locationError: string | null = null;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.initMap();
    });
  }

  private initMap(): void {
    this.map = L.map(this.mapContainer.nativeElement, {
      zoomAnimation: false,
      fadeAnimation: false
    }).setView([-34.397, 150.644], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
      minZoom: 5
    }).addTo(this.map);

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);

    this.getUserLocation();

    this.map.on('click', (event: L.LeafletMouseEvent) => {
      this.onMapClick(event);
    });
  }

  private getUserLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          this.map.setView([latitude, longitude], 15);
          this.selectedCoordinates = { lat: latitude, lng: longitude };

          if (this.marker) {
            this.map.removeLayer(this.marker);
          }
          this.marker = L.marker([latitude, longitude])
            .addTo(this.map)
            .bindPopup('Tu ubicación')
            .openPopup();

          this.locationError = null;
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          this.locationError = 'No se pudo obtener tu ubicación. Asegúrate de otorgar permisos de geolocalización.';
          this.map.setView([-34.397, 150.644], 6);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      this.locationError = 'La geolocalización no está soportada por este navegador.';
    }
  }

  private onMapClick(event: L.LeafletMouseEvent): void {
    this.selectedCoordinates = {
      lat: event.latlng.lat,
      lng: event.latlng.lng
    };

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    this.marker = L.marker([this.selectedCoordinates.lat, this.selectedCoordinates.lng])
      .addTo(this.map)
      .bindPopup(`Coordenadas: ${this.selectedCoordinates.lat.toFixed(4)}, ${this.selectedCoordinates.lng.toFixed(4)}`)
      .openPopup();
  }

  selectLocation(): void {
    if (this.selectedCoordinates) {
      this.modalController.dismiss({
        latitud: this.selectedCoordinates.lat,
        longitud: this.selectedCoordinates.lng
      });
    }
  }

  goBack(): void {
    this.modalController.dismiss(null, 'cancel');
  }

}