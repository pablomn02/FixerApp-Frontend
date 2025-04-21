import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, LoadingController } from '@ionic/angular';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-registro-profesional',
  templateUrl: './registro-profesional.page.html',
  styleUrls: ['./registro-profesional.page.scss'],
  standalone: false
})
export class RegistroProfesionalPage {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingCtrl: LoadingController
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(2)]],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      precioHora: ['', [Validators.required, Validators.min(0)]],
      ubicacion: this.formBuilder.group({
        latitud: [40.416775], // Latitud por defecto (Madrid, España)
        longitud: [-3.703790] // Longitud por defecto (Madrid, España)
      }),
      horarioDisponible: this.formBuilder.group({
        inicio: [''],
        fin: ['']
      }),
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.compararContrasenas });
  }

  compararContrasenas(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Método para registrar el valor del horario cuando pierde el foco
  logHorario(field: string) {
    const value = this.registerForm.get(`horarioDisponible.${field}`)?.value;
    console.log(`Horario (${field}):`, value);
  }

  // Método para transformar el formato de la hora ISO a HH:mm
  formatTime(isoString: string): string {
    if (!isoString) return '';
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Método para construir el objeto horarioDisponible con el formato esperado
  buildHorarioDisponible(inicio: string, fin: string) {
    const horario: { [key: string]: { inicio: string, fin: string }[] } = {
      lunes: [],
      martes: [],
      miercoles: [],
      jueves: [],
      viernes: [],
      sabado: [],
      domingo: []
    };

    if (inicio && fin) {
      const rango = { inicio: this.formatTime(inicio), fin: this.formatTime(fin) };
      // Aplica el mismo rango a todos los días
      Object.keys(horario).forEach(dia => {
        horario[dia].push(rango);
      });
    }

    return horario;
  }

  async onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.registerForm.valid) {
      const loading = await this.loadingCtrl.create({
        message: 'Registrando...',
        spinner: 'crescent',
        cssClass: 'custom-loading'
      });
      await loading.present();

      const { name, email, username, especialidad, precioHora, ubicacion, horarioDisponible, password } = this.registerForm.value;
      const userData = {
        nombre: name,
        email,
        usuario: username,
        contrasena: password,
        rol: 'profesional',
        especialidad,
        precioHora: Number(precioHora), // Asegurarse de que sea un número
        ubicacion: {
          latitud: Number(ubicacion.latitud), // Asegurarse de que sea un número
          longitud: Number(ubicacion.longitud) // Asegurarse de que sea un número
        },
        horarioDisponible: this.buildHorarioDisponible(horarioDisponible.inicio, horarioDisponible.fin),
        experiencia: null,
        certificaciones: null,
        calificacionPromedio: 0,
        totalContrataciones: 0
      };

      console.log("Datos enviados al backend:", JSON.stringify(userData, null, 2));

      this.loginService.registerProfesional(userData).subscribe({
        next: (response) => {
          loading.dismiss();
          this.successMessage = 'Registro exitoso. Redirigiendo a login.';
          setTimeout(() => {
            this.navCtrl.navigateRoot('/login');
          }, 3000);
        },
        error: (err) => {
          loading.dismiss();
          console.error('Error al registrarse:', err);
          if (err.status === 400) {
            this.errorMessage = err.error.error || 'Datos inválidos. Por favor, verifica los campos.';
          } else if (err.status === 409) {
            this.errorMessage = 'El correo electrónico ya está registrado.';
          } else if (err.status === 500) {
            this.errorMessage = 'Error en el servidor: ' + (err.error?.message || 'Por favor, intenta de nuevo más tarde.');
          } else if (err.status === 0) {
            this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión a internet.';
          } else {
            this.errorMessage = 'Ocurrió un error al registrarse. Intenta de nuevo.';
          }
          setTimeout(() => {
            this.errorMessage = null;
          }, 5000);
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      Object.keys(this.registerForm.controls).forEach((key) => {
        const control = this.registerForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  volver() {
    console.log("Regresando a la página de selección de tipo de cuenta...");
    this.navCtrl.navigateBack('/register');
  }
}