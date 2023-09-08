import { Component, Output, EventEmitter } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import esLocale from '@fullcalendar/core/locales/es';
import frLocale from '@fullcalendar/core/locales/fr';
import { paciente } from 'src/app/paciente/interfaces/paciente';
import { Especialidad, Medico } from 'src/app/medico/interfaces/medico';
import { Cita, Sala } from '../../interfaces/cita';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions={}

  ngOnInit(){
    this.calendarOptions = {
      schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
      initialView: 'dayGridMonth',
      weekends: true,
      locales: [ esLocale, frLocale ],
      locale: 'es',
      dateClick: this.onDateClick.bind(this),
      events: [],
      aspectRatio: 2,
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, resourceTimeGridPlugin]
      //dateClick:this.handleDateClick.bind(this),
    };
  }


  //enviar fecha
  @Output() enviarFecha = new EventEmitter<string>();


  onDateClick(date: { dateStr: string; }) {
    console.log(date)

    document.getElementById("btn-verDia")?.click();
    console.log("se envio la fecha");
    this.enviarFecha.emit(date.dateStr);
  }



  dateClick(model:any) {

  }


  ngAfterViewInit() {
    console.log('Inicializando FullCalendar');
  }

 










}
