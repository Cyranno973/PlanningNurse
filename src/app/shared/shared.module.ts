import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SpeedDialModule} from "primeng/speeddial";
import {TooltipModule} from "primeng/tooltip";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {RippleModule} from "primeng/ripple";
import { SelectButtonComponent } from './select-button/select-button.component';
import {SelectButtonModule} from "primeng/selectbutton";

/**
 * Module avec les éléments partagés
 */
@NgModule({
  declarations: [
    SelectButtonComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SpeedDialModule,
    TooltipModule,
    DynamicDialogModule,
    RippleModule,
    SelectButtonModule
  ],
  providers: [DialogService, DatePipe],
  exports: [
    ButtonModule,
    DialogModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    SpeedDialModule,
    DynamicDialogModule,
    TooltipModule,
    RippleModule,
    SelectButtonComponent
  ]
})
export class SharedModule {
}
