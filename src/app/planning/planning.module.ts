import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanningComponent} from "./planning.component";
import {CalendarWeekModule} from "angular-calendar";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    PlanningComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CalendarWeekModule
  ]
})
export class PlanningModule {
}
