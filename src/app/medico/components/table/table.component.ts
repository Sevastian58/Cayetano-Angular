import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Especialidad, Medico } from '../../interfaces/medico';
import { Sala } from 'src/app/cita/interfaces/cita';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  @Input() medicoList: Medico[] = [];
  @Output() valorEnviado = new EventEmitter<string>();
  @Output() enviarIdDelete = new EventEmitter<string>();

  dtOptions: DataTables.Settings = {};
  //dtTrigger:Subject<any> = new Subject<any>()
  //dtOptions: any = {};

  ngOnInit(): void {

    console.log(this.medicoList)
    this.dtOptions={
      responsive:true,
      pageLength : 5
    }
    /*
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive:true
      // ...
    };*/


  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["medicoList"]) {
      console.log(this. medicoList)
      this.dtOptions={
        responsive:true,
        pageLength : 5
      }
    }
  }

  enviarId(event: Event): void {
    const target = event.target as HTMLElement; // El botón que se hizo clic
    const row = target.closest('tr'); // Encuentra el elemento 'tr' más cercano (fila)

    if (row) {
        const codigo = row.querySelector('td:first-child')?.textContent; // Obtiene el contenido de la primera celda (código)

        if (codigo) {
            console.log('ID del medico:', codigo);
            // Aquí puedes realizar cualquier acción que necesites con el ID del paciente

            this.valorEnviado.emit(codigo)
          }
    }
}

enviarIdEliminar(event: Event): void {
  const target = event.target as HTMLElement; // El botón que se hizo clic
  const row = target.closest('tr'); // Encuentra el elemento 'tr' más cercano (fila)

  if (row) {
      const codigo = row.querySelector('td:first-child')?.textContent; // Obtiene el contenido de la primera celda (código)

      if (codigo) {
          console.log('ID del medico:', codigo);
          // Aquí puedes realizar cualquier acción que necesites con el ID del paciente

          this.enviarIdDelete.emit(codigo)
        }
  }
}


especialidad: Especialidad= {
  "codigo": 0,
  "nombre": ""
}

sala: Sala ={
  codigo:  "",
  estado:   "",
  espeSala: this.especialidad
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
    "salaMedico":this.sala,
    "especialidad":  this.especialidad
  }




}
