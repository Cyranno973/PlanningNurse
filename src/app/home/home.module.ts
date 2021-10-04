import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {SharedModule} from "../shared/shared.module";
import {SpeedDialModule} from "primeng/speeddial";
import {PatientsModule} from "../patients/patients.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        SpeedDialModule,
        PatientsModule
    ]
})
export class HomeModule {
}
