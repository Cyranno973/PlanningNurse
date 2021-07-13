import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TableModule} from "primeng/table";
import {CarService} from "./home/car.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FormsModule,
    FlatpickrModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
