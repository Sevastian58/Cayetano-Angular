import { Component, ElementRef, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { paciente } from 'src/app/paciente/interfaces/paciente';
import { HistorialService } from '../../services/historiaClinica.service';
import { HistoriaClinica } from '../../interfaces/historiaClinica';
import { Cita } from 'src/app/cita/interfaces/cita';
import { CitaService } from 'src/app/cita/services/cita.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  titulo:string="Historia Clinica";


  today:string = "";
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

  historia:HistoriaClinica= {
    codigo:           0,
    descripcion:      "",
    pacienteHistoria: this.paciente
  }

  @ViewChild('newHistory') newHistory:ElementRef;

  constructor(private serHistorial:HistorialService,
              private serCita:CitaService,
              private renderer: Renderer2){

    this.newHistory = new ElementRef(null);
  }



  ngOnInit(){
    moment.locale("es");
  }

  listaCitas:Cita[]=[];

  recibirPaciente(pac:paciente):void{
    this.paciente=pac;
    console.log("se recibio el paciente", this.paciente)

    this.buscarHistoriaPorPaciente();
    this.buscarCitasPaciente(this.paciente.codigo);


  }

  buscarHistoriaPorPaciente():void{
    this.serHistorial.findByPatient(this.paciente.codigo).subscribe(response=>{
      console.log("la historia buscada es ", response)
      if(response){
        this.historia=response;

        this.llenarHistoria(this.historia.descripcion);
      }
      else{
        this.llenarHistoria("");
      }
    })
  }

  llenarHistoria(relleno:string):void{
    let element = document.getElementById("txtOldHistory");
    console.log(element)
    if(element){
      element.innerHTML=relleno;
    }
  }

  buscarCitasPaciente(codPaciente:string):void{
    this.serCita.listAll().subscribe(response=>{
      if(response){

          this.listaCitas= response.filter(x=>x.paciente.codigo==this.paciente.codigo);

          this.listaCitas.sort((a, b) => {
            const dateA = new Date(a.fecha);
            const dateB = new Date(b.fecha);
            return dateB.getTime() - dateA.getTime();
          });

        console.log(this.listaCitas)
      }
    })
  }

  onSubmit():void{
  if(this.historia.codigo===0){
    this.saveHistoria();
  }else if(this.historia.codigo>=0){
    this.updateHistoria();
  }

  }

  saveHistoria():void{

    let element = document.getElementById("txtNewHistory") as HTMLTextAreaElement;
    let newHistory = element.value


    this.today= moment(Date.now()).format("Do MMMM YYYY, h:mm:ss a");
    this.historia.descripcion += "<b>" + this.today + "</b></br>" + newHistory +"</br>"
    this.historia.pacienteHistoria= this.paciente;
    alert(this.historia.descripcion)


    this.serHistorial.save(this.historia).subscribe(response=>{
      if(response){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Historia Registrada',
          showConfirmButton: false,
          timer: 1500
        })

        this.buscarHistoriaPorPaciente();
        this.cleanNewHistoria();
      }
    });


  }

  updateHistoria():void{

    let element = document.getElementById("txtNewHistory") as HTMLTextAreaElement;
    let newHistory = element.value


    this.today= moment(Date.now()).format("Do MMMM YYYY, h:mm:ss a");
    this.historia.descripcion += "<b>" + this.today + "</b></br>" + newHistory +"</br>"
    this.historia.pacienteHistoria= this.paciente;
    alert(this.historia.descripcion)


    console.log("historia por modificar", this.historia)
    this.serHistorial.update(this.historia).subscribe(response=>{
      console.log("historia modificada " , response)
      if(response){

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Historia Modificada',
          showConfirmButton: false,
          timer: 1500
        })

        this.buscarHistoriaPorPaciente();
        this.cleanNewHistoria();
      }
    });
  }


  cleanNewHistoria():void{
    this.renderer.setProperty(this.newHistory.nativeElement,"value", "");
  }

}
