import { Especialidad, Medico } from "src/app/medico/interfaces/medico";
import { paciente } from "src/app/paciente/interfaces/paciente";

export interface Cita {
  codigo:       number;
  fecha:        Date;
  hora:         string;
  estado:       number;
  paciente:     paciente;
  especialidad: Especialidad;
  sala:         Sala;
  medico:       Medico;
}


export enum Sexo {
  F = "F",
  M = "M",
}

export interface Sala {
  codigo:   string;
  estado:   string;
  espeSala: Especialidad;
}

export interface HorarioCita{
  hora:string,
  codPaciente: string,
  nombrePaciente:string
}
