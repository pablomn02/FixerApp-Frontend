import { Cliente } from "./cliente";
import { ProfesionalServicios } from "./profesional-servicios";
import { Valoracion } from "./valoracion";

export interface Contratacion {
    id: number,
    cliente: Cliente,
    profesionalServicio: ProfesionalServicios,
    fechaHora: Date,
    estado: string,
    duracionEstimada: number,
    costoTotal: number,
    valoraciones: Valoracion[]
}
