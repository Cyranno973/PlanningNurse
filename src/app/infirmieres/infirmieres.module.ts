import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfirmieresComponent} from './infirmieres.component';
import {TableModule} from "primeng/table";
import {DialogModule} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PlanicationComponent} from './planication/planication.component';
import {FormInfirmiereComponent} from './form-infirmiere/form-infirmiere.component';
import {TableauInfirmieresComponent} from './tableau-infirmieres/tableau-infirmieres.component';
import {SharedModule} from "../shared/shared.module";
import {SearchInfirmiereComponent} from './search-infirmiere/search-infirmiere.component';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    InfirmieresComponent,
    PlanicationComponent,
    FormInfirmiereComponent,
    TableauInfirmieresComponent,
    SearchInfirmiereComponent
  ]
})
export class InfirmieresModule {
}
