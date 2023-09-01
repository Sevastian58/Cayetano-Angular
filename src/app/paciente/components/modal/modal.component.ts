import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {


  constructor(private fb:FormBuilder){}

  @Output() enviarPacienteGuardar = new EventEmitter<paciente>();
  @Input()
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


  ngOnInit(){
    this.llenarValoreForm();
    console.log("paciente en el modal " ,this.paciente)
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["paciente"]) {
      console.log("cambio el paciente")
      this.llenarValoreForm();
    }
  }

  llenarValoreForm():void{
    let codigo = document.getElementById("codigo") as HTMLInputElement;
    let dni = document.getElementById("dni") as HTMLInputElement;
    let edad = document.getElementById("edad") as HTMLInputElement;
    let nombre = document.getElementById("nombre") as HTMLInputElement;
    let apellido = document.getElementById("apellido") as HTMLInputElement;
    let correo = document.getElementById("correo") as HTMLInputElement;
    let telefono = document.getElementById("telefono") as HTMLInputElement;

    if(codigo!=null){
      codigo.value=this.paciente.codigo;
    }
    if(dni!=null){
      dni.value=this.paciente.dni;
    }
    if(edad!=null){
      edad.value=this.paciente.edad.toString();
    }
    if(nombre!=null){
      nombre.value=this.paciente.nombre;
    }
    if(apellido!=null){
      apellido.value=this.paciente.apellido;
    }
    if(correo!=null){
      correo.value=this.paciente.correo;
    }
    if(telefono!=null){
      telefono.value=this.paciente.telefono;
    }


  }


  //formulario reactivo con angular
  public myForm:FormGroup=this.fb.group({
    codigo: ['', [Validators.required, Validators.minLength(4)]],
    dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido:['', [Validators.required, Validators.minLength(3)]],
    edad: [ 0, [Validators.required]],
    sexo: ['', [Validators.required, Validators.minLength(1)]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.minLength(9)]]
  })


  onSubmit():void{
    console.log("submit ejecutado")
     if(this.myForm.invalid){
      return;
     }
     else{
      console.log("formulario ejecutado",this.paciente);
      this.enviarPacienteGuardar.emit(this.paciente);
     }

  }

}
