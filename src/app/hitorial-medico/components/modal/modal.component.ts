import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sala } from 'src/app/cita/interfaces/cita';
import { paciente } from 'src/app/paciente/interfaces/paciente';
import { Observable, startWith, map } from 'rxjs';
import { PacienteService } from 'src/app/paciente/services/paciente.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Output() enviarPaciente = new EventEmitter<paciente>();


  paciente:paciente={
    "codigo": "",
    "dni": "",
    "nombre": "",
    "apellido": "",
    "edad": 0,
    "sexo": "",
    "correo": "",
    "telefono": ""

  }

  constructor(private serPaciente:PacienteService){
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nombre;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  myControl = new FormControl<string | paciente>('');
  options: paciente[] =[]
  filteredOptions: Observable<paciente[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nombre;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }


  enviarPacienteEvent():void{
    console.log("se envio el paciente")
    this.enviarPaciente.emit(this.paciente);
  }

  displayFn(pac: paciente): string {
    return pac && pac.nombre ? pac.nombre : '';
  }

  private _filter(name: string): paciente[] {
    const filterValue = name.toLowerCase();

    //llenamos los datos del paciente
    this.serPaciente.listAll().subscribe(response=>{
      if(response){
        this.options=response
      }

    })

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }
}
