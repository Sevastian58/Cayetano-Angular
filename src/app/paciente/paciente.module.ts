import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PacienteComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    PacienteComponent,
    TableComponent
  ]
})
export class PacienteModule { }
