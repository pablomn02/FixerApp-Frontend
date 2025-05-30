export interface Profesional {
    id: number,
    nombre: string,
    email: string,
    usuario: string,
    contrasena: string,
    rol: string,
    especialidad: any,
    precioHora: number,
    horarioDisponible: string,
    telefono: string;
    isFavorito: boolean;
}