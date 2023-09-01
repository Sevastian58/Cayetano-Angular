import { Component } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { paciente } from '../../interfaces/paciente';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {

  idRecibido: string = '';
  titulo:string="Listado de Pacientes"
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
  pacientes:paciente[]=[]
  constructor(private serPaciente:PacienteService){}


  recibirValor(valor: string):void {
        this.idRecibido = valor;
        console.log("id recibido " + this.idRecibido)
        //buscar paciente por id
        this.serPaciente.searchById(this.idRecibido).subscribe(response=>{
          if(response!=null){
            this.paciente = response;
            console.log(this.paciente)
          }
        })
  }


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


  //limpiar paciente
  cleanPaciente():void{

    this.serPaciente.listAll().subscribe(response=>{
      let lista:paciente[]= response;
      let listaCodigos : number[] = [];
      if(response!=null){
        for(let pac of lista){
          listaCodigos.push(parseInt(pac.codigo.substring(3)))
        }
        if(listaCodigos.length>0){
          let mayor = listaCodigos[0]
          for(let num of listaCodigos){
            if(num>mayor){
              mayor = num;
            }
          }
          if(mayor>0){
            mayor ++;
          }
          this.paciente = {
            "codigo": "PAC"+mayor,
            "dni": "",
            "nombre": "",
            "apellido": "",
            "edad": 0,
            "sexo": "",
            "correo": "",
            "telefono": ""

          }
        }
      }
    }

    )

  }

  //recibir paciente
  recibirPacienteGuardar(pac:paciente):void{
    console.log("paciente recibido", pac)
    //buscamos si el paciente ya existe
    this.serPaciente.searchById(pac.codigo).subscribe(response=>{
      if(response==null){
        //si el paciente no existe lo registramos
        this.registrarPaciente(pac);
      }
      else{
        this.modificarPaciente(pac);
      }
    })




  }


  registrarPaciente(pac:paciente):void{
    this.serPaciente.registrar(pac).subscribe(response=>{
      if(response!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paciente registrado',
          showConfirmButton: false,
          timer: 1500
        })
        this.listAll();
      }else{
        console.log(response)
      }
    })
  }


  modificarPaciente(pac:paciente):void{
    this.serPaciente.modificar(pac).subscribe(response=>{
      if(response!=null){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Paciente modificado',
          showConfirmButton: false,
          timer: 1500
        })
        this.listAll();
      }else{
        console.log(response)
      }
    })
  }

}
