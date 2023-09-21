import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Especialidad, Medico } from 'src/app/medico/interfaces/medico';
import { EspecialidadService } from 'src/app/medico/services/especialidad.service';
import { MedicoService } from 'src/app/medico/services/medico.service';
import { paciente } from 'src/app/paciente/interfaces/paciente';
import { Cita, HorarioCita, Sala } from '../../interfaces/cita';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map, Subject } from 'rxjs';
import { PacienteService } from 'src/app/paciente/services/paciente.service';
import { CitaService } from '../../services/cita.service';
import { SalaService } from '../../services/sala.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

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

  horasCita:HorarioCita[]=[{"hora":"08:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"09:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"10:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"11:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"12:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"14:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"15:00:00", "codPaciente": "", "nombrePaciente":""},
                            {"hora":"16:00:00", "codPaciente": "", "nombrePaciente":""}];

  constructor(private serEspecialidad:EspecialidadService,
              private serMedico:MedicoService,
              private serPaciente:PacienteService,
              private serCita:CitaService,
              private serSala:SalaService){

                this.filteredOptions = this.controlPaciente.valueChanges.pipe(
                  startWith(''),
                  map(value => {
                    const name = typeof value === 'string' ? value : value?.nombre;
                    return name ? this._filter(name as string) : this.options.slice();
                  }),
                );
  }

  dtOptions: DataTables.Settings = {};

  controlPaciente = new FormControl<string|paciente>('');
  //variables globales
  @Input()
  public fechaCita:string="";

  @Output()
  public enviarCitaGuardar=new EventEmitter<Cita>();

  public listaEspecialidades:Especialidad[]=[];
  public listaMedicos:Medico[]=[];
  public listaCitas:Cita[]=[];
  pacienteSeleccionado = this.controlPaciente.value;
  //autocompleate

  options: paciente[] = [];
  filteredOptions: Observable<paciente[]>;
  //tabla citas
  displayedColumns: string[] = ['hora', 'codPaciente', 'nombrePaciente'];
  dataSource = this.listaCitas;
  clickedRows = new Set<Cita>();



  displayFn(pac: paciente): string {
    return pac && pac.nombre ? pac.nombre : '';
  }
  ngOnInit(){

    this.llenarFilterOptions();
    this.mostrarPrimerModal();
    this.listarEspecialidades();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes["fechaCita"]) {
      console.log(this.fechaCita)
    }
  }

  llenarFilterOptions():void{
    this.filteredOptions = this.controlPaciente.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.nombre;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  private _filter(name: string): paciente[] {
    const filterValue = name.toLowerCase();

    //recibimos todos los pacientes
    this.serPaciente.listAll().subscribe(response=>{
      if(response!=null){
        this.options=response;
      }
    })

    return this.options.filter(option => option.nombre.toLowerCase().includes(filterValue) || option.apellido.toLowerCase().includes(filterValue));
  }

  //metodos
  mostrarPrimerModal():void{
    let primer = document.getElementById("modalContent01");
    if(primer!=null){
      primer.style.display="block";
    }
    let segundo = document.getElementById("modalContent02");
    if(segundo!=null){
      segundo.style.display="none";
    }
    let tercero = document.getElementById("modalContent03");
    if(tercero!=null){
      tercero.style.display="none";
    }
  }

  mostrarSegundoModal():void{
    let primer = document.getElementById("modalContent01");
    if(primer!=null){
      primer.style.display="none";
    }
    let segundo = document.getElementById("modalContent02");
    if(segundo!=null){
      segundo.style.display="block";
    }
    let tercero = document.getElementById("modalContent03");
    if(tercero!=null){
      tercero.style.display="none";
    }
  }

  mostrarTercerModal():void{
    let primer = document.getElementById("modalContent01");
    if(primer!=null){
      primer.style.display="none";
    }
    let segundo = document.getElementById("modalContent02");
    if(segundo!=null){
      segundo.style.display="none";
    }
    let tercero = document.getElementById("modalContent03");
    if(tercero!=null){

      this.llenarCitasDisponibles();
      tercero.style.display="block";
    }
  }

  listarEspecialidades():void{
    this.serEspecialidad.listAll().subscribe(response=>{
      if(response){
        this.listaEspecialidades=response;
      }
    })
  }

  listarMedicoEspecialidad():void{
    this.serMedico.listByEspecialidad(this.cita.especialidad.codigo).subscribe(response=>{
      this.listaMedicos=response;
    })

    if(this.medico.codigo!==""){
      this.definirSalaCita();
    }
  }

  definirSalaCita():void{

    let element = document.getElementById("medico") as HTMLSelectElement;
    if(element!=null){
      this.medico.codigo=element.value
    }

    console.log("se define la sala de la cita, el medico es " + this.medico.codigo);

    this.serSala.listByEspe(this.especialidad.codigo).subscribe(response=>{
      if(response){
        this.sala.codigo=response[0].codigo;
      }
    })
  }

  llenarCitasDisponibles():void{
    this.serCita.listCreate(this.cita.especialidad.codigo, this.cita.sala.codigo, this.cita.medico.codigo, this.fechaCita).subscribe(response=>{
      console.log(response)
      if(response){
        response.forEach(cita=>{
          this.horasCita.forEach(horaCita=>{
            if(horaCita.hora===cita.hora){
              horaCita.codPaciente=cita.paciente.codigo
              horaCita.nombrePaciente=cita.paciente.nombre
            }
          })
        })
        //recargar
      }
    })
  }

  obtenerHora(event: Event): void {
    const target = event.target as HTMLElement; // El botón que se hizo clic
    const row = target.closest('tr'); // Encuentra el elemento 'tr' más cercano (fila)

    if (row) {
        const hora = row.querySelector('td:first-child')?.textContent; // Obtiene el contenido de la primera celda (código)

        if(hora){
          this.cita.hora=hora
        }

        console.log("la hora es " + hora)

    }
}

  onSubmit():void{
    let nomPaciente =document.getElementById("paciente") as HTMLInputElement;
    if(nomPaciente!=null){
      console.log("el nombre es " + nomPaciente.value)
    }

    this.cita.fecha= new Date(this.fechaCita);

    this.enviarCitaGuardar.emit(this.cita);
    console.log("cita enviada", this.cita)
  }

}
