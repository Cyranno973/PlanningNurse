import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {SharedModule} from "../shared/shared.module";
import {PlanningModule} from "../planning/planning.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        PlanningModule
    ]
})
export class HomeModule {
}
