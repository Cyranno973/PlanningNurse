import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanningComponent} from "./planning.component";
import {SharedModule} from "../shared/shared.module";
import {FormRdvComponent} from './form-rdv/form-rdv.component';
import {MatStepperModule} from "@angular/material/stepper";
import {AutoCompleteModule} from "primeng/autocomplete";
import {PlanningPersoComponent} from './planning-perso/planning-perso.component';
import {CalendarModule} from "primeng/calendar";
import {CalendarWeekModule} from "angular-calendar";
import {CalendrierGlobalComponent} from './full-calendar/calendrier-global.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    PlanningComponent,
    FormRdvComponent,
    PlanningPersoComponent,
    CalendrierGlobalComponent
  ],
  exports: [
    PlanningPersoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatStepperModule,
    AutoCompleteModule,
    CalendarModule,
    CalendarWeekModule,
    FullCalendarModule
  ]
})
export class PlanningModule {
}
