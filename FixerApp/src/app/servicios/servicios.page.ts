import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
  standalone: false
})
export class ServiciosPage implements OnInit {

  profesional: any;

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    // Obtener el ID del profesional desde los parámetros de la ruta
    const id = this.route.snapshot.paramMap.get('id');

    // Simulación de datos (en un escenario real, harías una llamada al backend)
    this.profesional = {
      id: id,
      nombre: 'Juan Pérez',
      usuario: '@juanperez',
      foto: 'https://as01.epimg.net/img/comunes/fotos/fichas/deportistas/j/jos/large/19294.png',
      servicios: [
        { nombre: 'Limpieza', descripcion: 'Limpieza general de hogares', precio: 30.00 },
        { nombre: 'Electricista', descripcion: 'Reparaciones eléctricas', precio: 50.00 },
      ],
      valoraciones: [
        { puntuacion: 4, comentario: 'Muy buen servicio, puntual y profesional.', fecha: new Date('2025-01-15') },
        { puntuacion: 5, comentario: 'Excelente trabajo, lo recomiendo.', fecha: new Date('2025-02-10') },
      ],
    };
  }

  contratarProfesional() {
    console.log('Contratando al profesional:', this.profesional.nombre);
    // Aquí puedes implementar la lógica para contratar al profesional
    // Por ejemplo, navegar a una página de contratación con los datos del profesional
    this.navCtrl.navigateForward('/contratacion', {
      state: { profesional: this.profesional }
    });
  
  }
}
