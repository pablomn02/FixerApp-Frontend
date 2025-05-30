export interface ProfesionalServicioSimple {
  idProfesionalServicio: number;
  idUsuario: number;
  nombre: string;
  especialidad: string;
  precioHora: number;
  idServicio: number;
  nombreServicio: string;
  isFavorito: boolean;
  ubicacion: {
    latitud: number;
    longitud: number;
  };
}
