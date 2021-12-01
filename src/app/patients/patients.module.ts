import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PatientsComponent} from "./patients.component";
import {PatientComponent} from "./patient/patient.component";
import {FormPatientComponent} from "./patient/form-patient/form-patient.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {TimelineModule} from "primeng/timeline";
import {CardModule} from "primeng/card";
import {PatientRdvsComponent} from './patient/patient-rdvs/patient-rdvs.component';
import {FullNamePipe} from "../shared/pipes/full-name.pipe";

@NgModule({
  declarations: [
    PatientsComponent,
    PatientComponent,
    FormPatientComponent,
    PatientRdvsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TimelineModule,
    CardModule
  ],
  providers: [
    FullNamePipe
  ]
})
export class PatientsModule {
}
