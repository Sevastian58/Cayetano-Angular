import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';
import { DataTablesModule } from 'angular-datatables';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import Swal from 'sweetalert2'



@NgModule({
  declarations: [
    PacienteComponent,
    TableComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DataTablesModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports:[
    PacienteComponent,
    TableComponent,
    ModalComponent
  ]
})
export class PacienteModule { }
