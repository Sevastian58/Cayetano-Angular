import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './pages/historial/historial.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './components/modal/modal.component';
import Swal from 'sweetalert2';
import dateFormat, { masks } from "dateformat";




@NgModule({
  declarations: [
    HistorialComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
  ]
})
export class HitorialMedicoModule { }
