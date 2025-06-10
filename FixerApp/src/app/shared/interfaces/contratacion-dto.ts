export interface ContratacionDTO {
  idContratacion: number;
  idUsuario: number;
  nombreCliente: string;
  idProfesionalServicio: number;
  nombreProfesional: string;
  nombreServicio: string;
  fechaHora: string;
  estadoContratacion: string;
  duracionEstimada: number;
  costoTotal: number;
  isFavorito: boolean;
  yaValorada?: boolean;
  idProfesional: number
}
