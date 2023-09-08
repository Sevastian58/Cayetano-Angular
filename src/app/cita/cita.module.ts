import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CitaComponent } from './pages/cita/cita.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CitaRoutingModule } from './cita-routing.module';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import Swal from 'sweetalert2';
import { SearchCitaComponent } from './pages/search-cita/search-cita.component';
import { TableComponent } from './components/table/table.component'

@NgModule({
  declarations: [
    CitaComponent,
    CalendarComponent,
    ModalComponent,
    SearchCitaComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    CitaRoutingModule,
    MaterialModule,
    SharedModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    DataTablesModule
  ]
})
export class CitaModule { }
