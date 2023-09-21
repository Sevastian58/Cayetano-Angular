import { paciente } from 'src/app/paciente/interfaces/paciente';
import { Component, ElementRef, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { Especialidad, Medico } from 'src/app/medico/interfaces/medico';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { Cita, Sala } from '../../interfaces/cita';
import { EspecialidadService } from 'src/app/medico/services/especialidad.service';
import { MedicoService } from 'src/app/medico/services/medico.service';
import { NgFor } from '@angular/common';
import { CitaService } from '../../services/cita.service';
import * as moment from 'moment';

@Component({
  selector: 'app-search-cita',
  templateUrl: './search-cita.component.html',
  styleUrls: ['./search-cita.component.css']
})
export class SearchCitaComponent {
  //@ViewChild("citaCabecera01") cabecera01!: ElementRef;
  //@ViewChild("citaCabecera02") cabecera02!: ElementRef;


 titulo:string="Vista de Citas";

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


 constructor(private serPaciente:PacienteService,
            private serEspecialidad:EspecialidadService,
            private serMedico:MedicoService,
            private serCita:CitaService,
            private renderer: Renderer2){



 }

listaEspecialidades:Especialidad[]=[];
listaMedicos:Medico[]=[];
listaCitas:Cita[]=[];

ngOnInit(){
  this.listarEspecialidades();

}

ngAfterViewInit() { // Cambio aquí
  this.listarEspecialidades();
  let btnBuscarCita = document.getElementById("btnBuscarCita") as HTMLButtonElement;

 /* setTimeout(() => {
    if (btnBuscarCita) {
      btnBuscarCita.click();
    } else {
      console.log("el botón todavía no se crea")
    }
  }, 1000);*/

  this.buscarCita();
}



buscarCita():void{
  let cabecera1= document.getElementById("citaCabecera01") as HTMLDivElement;
  let cabecera2= document.getElementById("citaCabecera02") as HTMLDivElement;
  if(cabecera1!=null){
    cabecera1.style.display="block";
    let element= cabecera1.firstChild as HTMLElement;
    let nextElement = element.nextElementSibling as HTMLElement
    element.style.display="block";
    nextElement.style.display="block"
  }
  if(cabecera2){
    cabecera2.style.display="none";
    let element= cabecera2.firstChild as HTMLElement;
    element.style.display="none";
  }

}

verCita():void{
  let cabecera1= document.getElementById("citaCabecera01") as HTMLDivElement;
  let cabecera2= document.getElementById("citaCabecera02") as HTMLDivElement;
  if(cabecera1!=null){
    cabecera1.style.display="none";
    let element= cabecera1.firstChild as HTMLElement;
    let nextElement = element.nextElementSibling as HTMLElement
    element.style.display="none";
    nextElement.style.display="none"
  }
  if(cabecera2){
    cabecera2.style.display="block!important";
    let element= cabecera2.firstChild as HTMLElement;
    element.style.display="block";
  }


  //listamos las citas
  this.listarCitas();
}


listarEspecialidades():void{
  this.serEspecialidad.listAll().subscribe(response=>{
    if(response){
      this.listaEspecialidades=response;
    }
  })
}

listarMedicosEspecialidad(){
  console.log("se lista los medicos ")
  this.serMedico.listByEspecialidad(this.especialidad.codigo).subscribe(response=>{
    if(response){
      this.listaMedicos=response;
    }
  })
}


recibirPaciente(pac:paciente):void{
  this.paciente=pac;

  console.log(this.paciente)
}

listarCitas():void{
  let fecha:string = moment(this.cita.fecha).format("YYYY-MM-DD");
  let today = new Date();
  this.serCita.listAll().subscribe(response=>{

    console.log(this.paciente.codigo, this.especialidad.codigo, this.medico.codigo, fecha)
    if(this.paciente.codigo!=="" && this.especialidad.codigo===0 && this.medico.codigo=="" && fecha === moment(today).format("YYYY-MM-DD")){
      this.listaCitas = response.filter(c=>c.paciente.codigo==this.paciente.codigo);
    }
    if(this.especialidad.codigo===0 && this.medico.codigo===""){
      this.listaCitas = response.filter(c=>c.paciente.codigo==this.paciente.codigo
        && c.fecha.toString() === fecha);
    }
    else if(this.especialidad.codigo!==0 && this.medico.codigo==""){
      this.listaCitas = response.filter(c=>c.paciente.codigo==this.paciente.codigo
        && c.especialidad.codigo==this.especialidad.codigo
        && c.fecha.toString() === fecha);
    }
    else if(this.especialidad.codigo===0 && this.medico.codigo!==""){
      this.listaCitas = response.filter(c=>c.paciente.codigo==this.paciente.codigo
        && c.medico.codigo==this.medico.codigo
        && c.fecha.toString() === fecha);
    }
    else{
      this.listaCitas = response.filter(c=>c.paciente.codigo==this.paciente.codigo
        && c.especialidad.codigo==this.especialidad.codigo
        && c.medico.codigo==this.medico.codigo
        && c.fecha.toString() === fecha);
    }


  })


}


}
