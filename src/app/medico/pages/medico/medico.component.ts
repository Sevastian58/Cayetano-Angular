import { Component } from '@angular/core';
import { Especialidad, Medico } from '../../interfaces/medico';
import { MedicoService } from '../../services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent {
  idRecibido : string = "";
  titulo:string="Listado de Medicos";

  medicos:Medico[]=[];

  especialidad: Especialidad= {
    "codigo": 0,
    "nombre": ""
  }

    medico: Medico= {
      "codigo":   "",
      "dni":      "",
      "nombre":   "",
      "apellido": "",
      "telefono": "",
      "edad":     0,
      "sexo":     "",
      "correo":   "",
      "especialidad":  this.especialidad
    }

    constructor(private serMedico:MedicoService){}

    ngOnInit(){
      this.listAllMed();
    }

    listAllMed():void{
      this.serMedico.listAll().subscribe(response=>{
        if(response!=null){
          this.medicos= response;
          console.log(response)
        }
        else{
          console.log("respuesta vacia")
        }
      })
    }

    searchById(id:string){
      this.serMedico.searchById(id).subscribe(response=>{
        if(response!=null){
          this.medico=response
        }else{
          console.log("no se encontro medico");
        }
      })
    }

    save(med:Medico){
      this.serMedico.save(med).subscribe(response=>{
        if(response){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Medico registrado',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }

    update(med:Medico){
      this.serMedico.update(med).subscribe(response=>{
        if(response){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Medico modificado',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    }

    //otros metodos

    recibirId(id:string):void{
      this.idRecibido=id;

      //buscamos el paciente por id
      this.searchById(this.idRecibido);
    }

    recibirIdEliminar(id:string):void{
      this.idRecibido=id;

      /*Swal.fire({
        title: 'Desea eliminar el medico ' + this.idRecibido + '?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: `No eliminar`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.serMedico.deleteById(this.idRecibido).subscribe();
          this.listAllMed();
        } else if (result.isDenied) {
          Swal.fire('Medico no eliminado', '', 'info')
        }
      })*/

    }

    recibirMedicoGuardar(med:Medico):void{
      this.serMedico.searchById(med.codigo).subscribe(response=>{
        if(response!=null){
          this.update(med);
          this.listAllMed()
        }else{
          this.save(med);
          this.listAllMed();
        }
      })
    }

    cleanMedico():void{
      this.serMedico.listAll().subscribe(response=>{
        let lista:Medico[]= response;
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

            this.especialidad= {
              "codigo": 0,
              "nombre": ""
            }

              this.medico = {
                "codigo":   "MED" + mayor,
                "dni":      "",
                "nombre":   "",
                "apellido": "",
                "telefono": "",
                "edad":     0,
                "sexo":     "",
                "correo":   "",
                "especialidad":  this.especialidad
              }

          }
        }
      })

    }



}
