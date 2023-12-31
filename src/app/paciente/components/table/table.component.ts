import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { paciente } from '../../interfaces/paciente';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{

  @Input() pacienteList: paciente[] = [];
  @Output() valorEnviado = new EventEmitter<string>();
  dtOptions: DataTables.Settings = {};
  //dtTrigger:Subject<any> = new Subject<any>()
  //dtOptions: any = {};

  ngOnInit(): void {

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
    if (changes["pacienteList"]) {
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
            console.log('ID del paciente:', codigo);
            // Aquí puedes realizar cualquier acción que necesites con el ID del paciente

            this.valorEnviado.emit(codigo)
          }
    }
}

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
}
