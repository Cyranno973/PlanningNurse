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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {SigninComponent} from './authentification/signin/signin.component';
import {AppRoutingModule} from './app-routing.module';
import {SignUpComponent} from './authentification/sign-up/sign-up.component';
import {AuthenticationService} from "./services/authentication.service";
import {PasswordResetComponent} from './authentification/password-reset/password-reset.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignUpComponent,
    PasswordResetComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    TableModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FormsModule,
    FlatpickrModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [CarService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
