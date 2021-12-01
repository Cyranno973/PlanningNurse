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


@NgModule({
  declarations: [
    PlanningComponent,
    FormRdvComponent,
    PlanningPersoComponent
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
        CalendarWeekModule
    ]
})
export class PlanningModule {
}
