import { Sala } from "src/app/cita/interfaces/cita";

export interface Medico {
  codigo:       string;
  dni:          string;
  nombre:       string;
  apellido:     string;
  telefono:     string;
  edad:         number;
  sexo:         string;
  correo:       string;
  salaMedico:   Sala;
  especialidad: Especialidad;
}

export interface Especialidad {
  codigo: number;
  nombre: string;
}
