import { Component } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { paciente } from '../../interfaces/paciente';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {

  pacientes:paciente[]=[]
  constructor(private serPaciente:PacienteService){}

  ngOnInit(){
    this.listAll();
  }

  listAll():void{
    this.serPaciente.listAll().subscribe(response=>{
      if(response!=null){
        this.pacientes = response;
      }
      else{
        console.error("respuesta invalida")
      }
    })
  }
}
