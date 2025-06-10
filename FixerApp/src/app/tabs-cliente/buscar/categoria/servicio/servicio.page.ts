import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { ContratarModalPage } from "src/app/shared/componentes/contratar-modal/contratar-modal.page";
import { PerfilProfesionalModalPage } from "src/app/shared/componentes/perfil-profesional-modal/perfil-profesional-modal.page";
import { ProfesionalServicioSimple } from "src/app/shared/interfaces/profesional-servicio-simple";
import { ProfesionalServicioService } from "src/app/shared/services/profesional-servicio.service";
import { ServicioService } from "src/app/shared/services/servicio.service";
import { BuscarCalleService } from "src/app/shared/services/buscar-calle.service";

@Component({
  selector: "app-servicio",
  templateUrl: "./servicio.page.html",
  styleUrls: ["./servicio.page.scss"],
  standalone: false,
})
export class ServicioPage implements OnInit {
  servicio: any;
  profesionales: ProfesionalServicioSimple[] = [];
  usuarioIdLogueado!: number;
  showFilters = false;

  filtro = {
    valoracionMinima: 0,
    precioMaximo: 200,
  };

  clienteLat?: number;
  clienteLon?: number;
  direccionCliente: string = "";

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private profServService: ProfesionalServicioService,
    private buscarCalleService: BuscarCalleService,
    private modalController: ModalController,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    const idCat = this.route.snapshot.paramMap.get("id");
    if (idCat) {
      const id = Number(idCat);
      this.servicioService.getServiciosByCategoria(id).subscribe(s => (this.servicio = s));
      this.profServService.getProfesionalesByServicio(id).subscribe(ps => (this.profesionales = ps));
    }

    const idGuardado = localStorage.getItem("idUsuario");
    if (idGuardado) {
      this.usuarioIdLogueado = Number(idGuardado);
    } else {
      console.error("No se encontró el idUsuario en localStorage");
    }

    this.buscarCalleService.direccion$.subscribe(dir => {
      this.direccionCliente = dir;
    });
    this.buscarCalleService.obtenerUbicacion();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.clienteLat = position.coords.latitude;
          this.clienteLon = position.coords.longitude;
        },
        error => {
          console.error("Error obteniendo ubicación del cliente:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  getActiveFiltersCount(): number {
    let count = 0;
    if (this.filtro.valoracionMinima !== 0) count++;
    if (this.filtro.precioMaximo !== 200) count++;
    return count;
  }

  private toRadian(deg: number): number {
    return (deg * Math.PI) / 180;
  }

  private distanciaKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRadian(lat2 - lat1);
    const dLon = this.toRadian(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadian(lat1)) * Math.cos(this.toRadian(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  get profesionalesFiltrados(): ProfesionalServicioSimple[] {
    if (this.clienteLat == null || this.clienteLon == null) {
      return this.profesionales.filter(prof => {
        const media = prof.valoracionMedia ?? 0;
        const precio = prof.precioHora ?? Infinity;
        return media >= this.filtro.valoracionMinima && precio <= this.filtro.precioMaximo;
      });
    }

    return this.profesionales.filter(prof => {
      const media = prof.valoracionMedia ?? 0;
      const precio = prof.precioHora ?? Infinity;
      if (media < this.filtro.valoracionMinima || precio > this.filtro.precioMaximo) {
        return false;
      }

      const profLat = prof.ubicacion?.latitud;
      const profLon = prof.ubicacion?.longitud;
      if (profLat == null || profLon == null) {
        return false;
      }

      const d = this.distanciaKm(this.clienteLat!, this.clienteLon!, profLat, profLon);
      return d <= 100;
    });
  }

  async abrirPerfil(event: Event, prof: ProfesionalServicioSimple) {
    event.stopPropagation();

    const modal = await this.modalController.create({
      component: PerfilProfesionalModalPage,
      componentProps: {
        profesional: prof,
        usuarioId: this.usuarioIdLogueado,
      },
      cssClass: "perfil-modal",
    });

    modal.onDidDismiss().then(({ data }) => {
      if (data === true) {
        const index = this.profesionales.findIndex(p => p.idUsuario === prof.idUsuario);
        if (index !== -1) {
          this.profesionales[index].isFavorito = !this.profesionales[index].isFavorito;
        }
      }
    });

    await modal.present();
  }

  async contratar(event: Event, profesional: ProfesionalServicioSimple) {
    event.stopPropagation();
    const modal = await this.modalController.create({
      component: ContratarModalPage,
      componentProps: {
        profesional: profesional,
        usuarioId: this.usuarioIdLogueado,
      },
      cssClass: "classic-modal",
    });
    await modal.present();
  }

  limpiarFiltros() {
    this.filtro = {
      valoracionMinima: 0,
      precioMaximo: 200,
    };
  }
}
