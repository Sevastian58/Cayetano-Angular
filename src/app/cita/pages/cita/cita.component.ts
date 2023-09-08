import { Component } from '@angular/core';
import { Cita, Sala } from '../../interfaces/cita';
import { dA } from '@fullcalendar/core/internal-common';
import { Especialidad, Medico } from 'src/app/medico/interfaces/medico';
import { paciente } from 'src/app/paciente/interfaces/paciente';
import { DataTablesModule } from 'angular-datatables';
import { CitaService } from '../../services/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent {

  constructor(private serCita:CitaService){

  }


  public titulo:string="Registro de Citas";
  public fechaCita:string =  "";

  //creamos un bojeto de cita

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
    codigo:   "",
    estado:   "",
    espeSala: this.especialidad
  }

  public medico: Medico= {
    codigo:       "",
    dni:          "",
    nombre:       "",
    apellido:     "",
    telefono:     "",
    edad:         0,
    sexo:         "",
    correo:       "",
    salaMedico: this.sala,
    especialidad: this.especialidad
  }

  public cita:Cita= {
    codigo:       0,
    fecha:        new Date(),
    hora:         "",
    estado:       0,
    paciente:     this.paciente,
    especialidad: this.especialidad,
    sala:         this.sala,
    medico:       this.medico
  }

  recibirFecha(fecha:string){
    this.fechaCita = fecha;
  }


  public recibirCitaGuardar(cita:Cita):void{
    this.cita=cita;
    console.log("la cita recibida es " , this.cita)

    this.serCita.save(this.cita).subscribe(response=>{
      console.log("la respuesta es ", response)
      if(response){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Cita registrada',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

  }
}
