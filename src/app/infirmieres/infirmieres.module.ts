import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfirmieresComponent} from './infirmieres.component';
import {TableModule} from "primeng/table";


@NgModule({
  imports: [
    CommonModule,
    TableModule
  ],
  declarations: [
    InfirmieresComponent
  ]
})
export class InfirmieresModule {
}
