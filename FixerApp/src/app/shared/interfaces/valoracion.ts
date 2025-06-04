export interface Valoracion {
  id?: number;
  puntuacion: number;
  comentario: string;
  fechaTimestamp?: Date;
  cliente: { id: number };
  profesional: { id: number };
  contratacion: { id: number };
  nombreCliente: string;
}
