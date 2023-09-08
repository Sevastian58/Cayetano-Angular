import { paciente } from "src/app/paciente/interfaces/paciente";

export interface HistoriaClinica {
  codigo:           number;
  descripcion:      string;
  pacienteHistoria: paciente;
}
