import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {ReactiveFormsModule} from "@angular/forms";
import {SpeedDialModule} from "primeng/speeddial";
import {TooltipModule} from "primeng/tooltip";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";

/**
 * Module avec les éléments partagés
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    TableModule,
    ReactiveFormsModule,
    SpeedDialModule,
    TooltipModule,
    DynamicDialogModule
  ],
  providers: [DialogService],
  exports: [
    ButtonModule,
    DialogModule,
    TableModule,
    ReactiveFormsModule,
    SpeedDialModule,
    DynamicDialogModule
  ]
})
export class SharedModule {
}
