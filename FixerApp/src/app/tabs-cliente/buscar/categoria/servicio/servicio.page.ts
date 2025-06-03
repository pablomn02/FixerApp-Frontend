import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { ModalController, NavController } from "@ionic/angular"
import { ContratarModalPage } from "src/app/shared/componentes/contratar-modal/contratar-modal.page"
import { PerfilProfesionalModalPage } from "src/app/shared/componentes/perfil-profesional-modal/perfil-profesional-modal.page"
import { ProfesionalServicioSimple } from "src/app/shared/interfaces/profesional-servicio-simple"
import { ProfesionalServicioService } from "src/app/shared/services/profesional-servicio.service"
import { ServicioService } from "src/app/shared/services/servicio.service"


@Component({
  selector: "app-servicio",
  templateUrl: "./servicio.page.html",
  styleUrls: ["./servicio.page.scss"],
  standalone: false,
})
export class ServicioPage implements OnInit {
  servicio: any
  profesionales: ProfesionalServicioSimple[] = []
  usuarioIdLogueado!: number
  showFilters = false

  filtro = {
    valoracionMinima: 0,
    precioMaximo: 200,
  }

  constructor(
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private profServService: ProfesionalServicioService,
    private modalController: ModalController,
    public navCtrl: NavController,
  ) {}

  ngOnInit() {
    const idCat = this.route.snapshot.paramMap.get("id")
    if (idCat) {
      const id = Number(idCat)
      this.servicioService.getServiciosByCategoria(id).subscribe((s) => (this.servicio = s))
      this.profServService.getProfesionalesByServicio(id).subscribe((ps) => (this.profesionales = ps))
    }

    const idGuardado = localStorage.getItem("idUsuario")
    if (idGuardado) {
      this.usuarioIdLogueado = Number(idGuardado)
    } else {
      console.error("No se encontró el idUsuario en localStorage")
    }
  }

  toggleFilters() {
    this.showFilters = !this.showFilters
  }

  getActiveFiltersCount(): number {
    let count = 0
    if (this.filtro.valoracionMinima !== 0) count++
    if (this.filtro.precioMaximo !== 200) count++
    return count
  }

  get profesionalesFiltrados(): ProfesionalServicioSimple[] {
    return this.profesionales.filter((prof) => {
      const cumpleValoracion = prof.valoracionMedia >= this.filtro.valoracionMinima
      const cumplePrecio = prof.precioHora <= this.filtro.precioMaximo
      return cumpleValoracion && cumplePrecio
    })
  }

  async abrirPerfil(event: Event, prof: ProfesionalServicioSimple) {
    event.stopPropagation()

    const modal = await this.modalController.create({
      component: PerfilProfesionalModalPage,
      componentProps: {
        profesional: prof,
        usuarioId: this.usuarioIdLogueado,
      },
      cssClass: "perfil-modal",
    })

    modal.onDidDismiss().then(({ data }) => {
      if (data === true) {
        const index = this.profesionales.findIndex((p) => p.idUsuario === prof.idUsuario)
        if (index !== -1) {
          this.profesionales[index].isFavorito = !this.profesionales[index].isFavorito
        }
      }
    })

    await modal.present()
  }

  async contratar(event: Event, profesional: ProfesionalServicioSimple) {
    event.stopPropagation()
    const modal = await this.modalController.create({
      component: ContratarModalPage,
      componentProps: {
        profesional: profesional,
        usuarioId: this.usuarioIdLogueado,
      },
      cssClass: "classic-modal",
    })
    await modal.present()
  }

  async toggleFavorite(event: Event, prof: ProfesionalServicioSimple) {
    event.stopPropagation()
    // Aquí implementarías la lógica para agregar/quitar de favoritos
    prof.isFavorito = !prof.isFavorito
  }

  limpiarFiltros() {
    this.filtro = {
      valoracionMinima: 0,
      precioMaximo: 200,
    }
  }
}
