import { Contratacion } from "./contratacion";
import { Profesional } from "./profesional";
import { Servicio } from "./servicio";

export interface ProfesionalServicios {
    id: number,
    profesional: Profesional,
    servicio: Servicio,
    precio: number,
    descripcionServicio: string,
    contrataciones: Contratacion[]
}
