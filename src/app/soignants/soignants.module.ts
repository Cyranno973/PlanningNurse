import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SoignantsComponent} from "./soignants.component";
import {PlanificationComponent} from "./planication/planification.component";
import {FormSoignantComponent} from "./form-soignant/form-soignant.component";
import {TableauSoignantComponent} from "./tableau-soignants/tableau-soignant.component";
import {SharedModule} from "../shared/shared.module";
import {CalendarModule} from "primeng/calendar";


@NgModule({
  declarations: [
    SoignantsComponent,
    PlanificationComponent,
    FormSoignantComponent,
    TableauSoignantComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        CalendarModule
    ]
})
export class SoignantsModule {
}
