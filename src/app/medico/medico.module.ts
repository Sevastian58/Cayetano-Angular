import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicoComponent } from './pages/medico/medico.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DataTablesModule } from 'angular-datatables';
import { ModalComponent } from './components/modal/modal.component';
import { TableComponent } from './components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@NgModule({
  declarations: [
    MedicoComponent,
    ModalComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    DataTablesModule,
    ReactiveFormsModule
  ],
  exports:[
    ModalComponent,
    TableComponent
  ]
})
export class MedicoModule { }
