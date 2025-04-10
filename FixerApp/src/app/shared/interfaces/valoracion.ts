import { Cliente } from "./cliente";
import { Contratacion } from "./contratacion";
import { Profesional } from "./profesional";

export interface Valoracion {
    id: number,
    cliente: Cliente,
    profesional: Profesional,
    puntuacion: number,
    comentario: string,
    fechaTimestamp: Date,
    contratacion: Contratacion
}
