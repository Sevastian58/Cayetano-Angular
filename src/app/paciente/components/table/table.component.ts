import { Component, Input } from '@angular/core';
import * as $ from 'jquery';
import DataTable from 'datatables.net-dt';
import { paciente } from '../../interfaces/paciente';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  ngOnInit(){
    new DataTable('#paciente-table');
  }

  @Input()
  pacienteList :paciente[]=[];

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
