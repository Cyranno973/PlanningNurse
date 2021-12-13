import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-calendrier-global',
  templateUrl: './calendrier-global.component.html',
  styleUrls: ['./calendrier-global.component.scss']
})
export class CalendrierGlobalComponent implements OnInit {

  events: any[];
  options: CalendarOptions;
  header: any;

  constructor() {
  }

  ngOnInit(): void {
    this.options = {
      initialDate: '2019-01-01',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      locales: [frLocale],
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };
  }

}
