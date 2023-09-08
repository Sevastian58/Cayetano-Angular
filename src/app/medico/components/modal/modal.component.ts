import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad, Medico } from '../../interfaces/medico';
import { EspecialidadService } from '../../services/especialidad.service';
import { Sala } from 'src/app/cita/interfaces/cita';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {


  constructor(private fb:FormBuilder, private serEspecialidad:EspecialidadService){}

  @Output() enviarMedicoGuardar = new EventEmitter<Medico>();

  listaEspecialidades:Especialidad[]=[];


  especialidad: Especialidad= {
    "codigo": 0,
    "nombre": "Especialidad por defecto"
  }

  sala: Sala ={
    codigo:  "",
    estado:   "",
    espeSala: this.especialidad
  }

  @Input()
    medico: Medico= {
      "codigo":   "",
      "dni":      "",
      "nombre":   "",
      "apellido": "",
      "telefono": "",
      "edad":     0,
      "sexo":     "",
      "correo":   "",
      "salaMedico" : this.sala,
      "especialidad":  this.especialidad
    }



  ngOnInit(){
    //this.llenarValoreForm();
    this.listAllEspecialidades();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["medico"]) {
      console.log("cambio el medico")
      console.log(this.medico.especialidad)
      //this.llenarValoreForm();
    }
  }

  /*llenarValoreForm():void{
    let codigo = document.getElementById("codigo") as HTMLInputElement;
    let dni = document.getElementById("dni") as HTMLInputElement;
    let edad = document.getElementById("edad") as HTMLInputElement;
    let nombre = document.getElementById("nombre") as HTMLInputElement;
    let apellido = document.getElementById("apellido") as HTMLInputElement;
    let correo = document.getElementById("correo") as HTMLInputElement;
    let telefono = document.getElementById("telefono") as HTMLInputElement;

    if(codigo!=null){
      codigo.value=this.medico.codigo;
    }
    if(dni!=null){
      dni.value=this.medico.dni;
    }
    if(edad!=null){
      edad.value=this.medico.edad.toString();
    }
    if(nombre!=null){
      nombre.value=this.medico.nombre;
    }
    if(apellido!=null){
      apellido.value=this.medico.apellido;
    }
    if(correo!=null){
      correo.value=this.medico.correo;
    }
    if(telefono!=null){
      telefono.value=this.medico.telefono;
    }

  }*/


  //formulario reactivo con angular
  public myForm:FormGroup=this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(4)]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido:['', [Validators.required, Validators.minLength(3)]],
    edad: [ 0, [Validators.required]],
    sexo: ['', [Validators.required, Validators.minLength(1)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(9)]],
    especialidad: [null, [Validators.required]],
  })


  onSubmit():void{
    console.log("submit ejecutado")
     if(this.myForm.invalid){
      console.log("formulario invalido", this.medico)
      return;
     }
     else{
      console.log("formulario ejecutado",this.medico);
      this.enviarMedicoGuardar.emit(this.medico);
     }

  }

  listAllEspecialidades():void{
    this.serEspecialidad.listAll().subscribe(response=>{
      if(response){
        this.listaEspecialidades=response;
      }
    })
  }

}
