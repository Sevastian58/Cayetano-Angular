import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { paciente } from 'src/app/paciente/interfaces/paciente';
import { Observable, startWith, map } from 'rxjs';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Especialidad, Medico } from 'src/app/medico/interfaces/medico';
import { Cita, Sala } from '../../interfaces/cita';

@Component({
  selector: 'app-modal-paciente',
  templateUrl: './modal-paciente.component.html',
  styleUrls: ['./modal-paciente.component.css']
})
export class ModalPacienteComponent {

  public paciente: paciente={
    "codigo": "",
    "dni": "",
    "nombre": "",
    "apellido": "",
    "edad": 0,
    "sexo": "",
    "correo": "",
    "telefono": ""
  }

  public especialidad: Especialidad= {
    "codigo": 0,
    "nombre": ""
  }

  public sala:Sala ={
    "codigo":   "",
    "estado":   "",
    "espeSala": this.especialidad
  }

  public medico: Medico= {
    "codigo":       "",
    "dni":          "",
    "nombre":       "",
    "apellido":     "",
    "telefono":     "",
    "edad":         0,
    "sexo":         "",
    "correo":       "",
    "especialidad": this.especialidad
  }

  public cita:Cita= {
    "codigo":       0,
    "fecha":        new Date(),
    "hora":         "",
    "estado":       1,
    "paciente":     this.paciente,
    "especialidad": this.especialidad,
    "sala":         this.sala,
    "medico":       this.medico
  }



  @Output() enviarPaciente = new EventEmitter<paciente>;
  myControl = new FormControl<string | paciente>('');
  options: paciente[] = [];
  filteredOptions: Observable<paciente[]>;


  constructor(private serPaciente:PacienteService){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nombre;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nombre;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }


  displayFn(pac:paciente): string {
    return pac && pac.nombre ? pac.nombre : '';
  }

  private _filter(name: string): paciente[] {
    const filterValue = name.toLowerCase();
    this.serPaciente.listAll().subscribe(response=>{
      if(response){
        this.options=response;
      }
    })
    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue) || option.apellido.toLowerCase().includes(filterValue) || option.codigo.toLowerCase().includes(filterValue) );
  }

  functionEnviarPaciente(){
    this.enviarPaciente.emit(this.paciente);
  }
}
