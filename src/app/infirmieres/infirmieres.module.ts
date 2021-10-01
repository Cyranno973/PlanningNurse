import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfirmieresComponent} from './infirmieres.component';
import {TableModule} from "primeng/table";
import {DialogModule} from 'primeng/dialog';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    InfirmieresComponent
  ]
})
export class InfirmieresModule {
}
