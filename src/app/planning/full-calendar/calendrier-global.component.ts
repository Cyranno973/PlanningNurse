import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarOptions, EventClickArg, EventInput} from "@fullcalendar/angular";
import frLocale from '@fullcalendar/core/locales/fr';
import {PlanningRepository} from "../../repository/planning-repository.service";
import {Rdv} from "../../model/planning-rdv";
import {AbbreviatePipe} from "../../shared/pipes/abbreviate.pipe";

@Component({
  selector: 'calendrier-global',
  templateUrl: './calendrier-global.component.html',
  styleUrls: ['./calendrier-global.component.scss']
})
export class CalendrierGlobalComponent implements OnInit {
  rdvs: Rdv[] = [];
  options: CalendarOptions;
  @Output()
  openRdv = new EventEmitter<Rdv>();

  constructor(private planningRepo: PlanningRepository, private abrPipe: AbbreviatePipe) {
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  private fetchEvents() {
    const events: EventInput[] = []
    this.planningRepo.getMois()
      .then(m => {
        m.jours.forEach((rdvs) => {
          this.rdvs.push(...rdvs);
          rdvs.forEach(rdv => {
            events.push(this.rdvToEvent(rdv));
          });
        });

        return events;
      }) // Peuplement des options du calendrier
      .then(eventss => {
        this.options = {
          initialDate: '2019-01-01',
          headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          },
          eventClick: (e) => this.eventClicked(e),
          events: eventss,
          locales: [frLocale],
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true
        };
      })
  }

  rdvToEvent(rdv: Rdv): EventInput {
    return {
      id: rdv.id,
      title: this.abrPipe.transform(rdv.patient),
      classNames: ['rdv-wrapper', rdv.statut],
      start: rdv.date,
      end: new Date(rdv.date.getTime() + rdv.duree * 60000) // Ajoute la durée du rdv pour la fin
    };
  }

  private eventClicked(eventClickArg: EventClickArg) {
    const rdv = this.rdvs.find(r => r.id === eventClickArg.event.id);
    this.openRdv.emit(rdv);
  }
}
