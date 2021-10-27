import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SoignantsComponent} from "./soignants.component";
import {PlanicationComponent} from "./planication/planication.component";
import {FormSoignantComponent} from "./form-soignant/form-soignant.component";
import {SearchSoignantComponent} from "./search-soignant/search-soignant.component";
import {TableauSoignantComponent} from "./tableau-soignants/tableau-soignant.component";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    SoignantsComponent,
    PlanicationComponent,
    FormSoignantComponent,
    SearchSoignantComponent,
    TableauSoignantComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SoignantsModule {
}
