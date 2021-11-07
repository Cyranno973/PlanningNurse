import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanningComponent} from "./planning.component";
import {CalendarWeekModule} from "angular-calendar";
import {SharedModule} from "../shared/shared.module";
import {FormRdvComponent} from './form-rdv/form-rdv.component';
import {MatStepperModule} from "@angular/material/stepper";
import {AutoCompleteModule} from "primeng/autocomplete";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    PlanningComponent,
    FormRdvComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarWeekModule,
    MatStepperModule,
    AutoCompleteModule,
    CalendarModule
  ]
})
export class PlanningModule {
}
