import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Cita } from '../../interfaces/cita';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  dtOptions: DataTables.Settings = {};
  @Output() valorEnviado = new EventEmitter<string>();
  //lista de citas
  @Input()
  citaList:Cita[]=[];


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
}
