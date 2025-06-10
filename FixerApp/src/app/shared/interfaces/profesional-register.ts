interface ProfesionalRegisterData {
  nombre: string;
  email: string;
  usuario: string;
  contrasena: string;
  rol: string;
  especialidad: string;
  idServicio: number;
  precioHora: number;
  latitud: number;
  longitud: number;
  horarioDisponible: { [key: string]: { inicio: string; fin: string }[] };
  experiencia: number | null;
  certificaciones: string | null;
  calificacionPromedio: number;
  totalContrataciones: number;
}