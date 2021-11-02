import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientsComponent} from "./patients.component";
import {PatientComponent} from "./patient/patient.component";
import {FormPatientComponent} from "./patient/form-patient/form-patient.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";

@NgModule({
  declarations: [
    PatientsComponent,
    PatientComponent,
    FormPatientComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TimelineModule,
    CardModule
  ]
})
export class PatientsModule {
}
