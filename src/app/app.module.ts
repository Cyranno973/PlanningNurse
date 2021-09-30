import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {TableModule} from "primeng/table";
import {CarService} from "./home/car.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CommonModule, registerLocaleData} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {SigninComponent} from './authentification/signin/signin.component';
import {AppRoutingModule} from './app-routing.module';
import {SignUpComponent} from './authentification/sign-up/sign-up.component';
import {PasswordResetComponent} from './authentification/password-reset/password-reset.component';
import {HeaderComponent} from './header/header.component';
import {PatientComponent} from './patients/patient/patient.component';
import {TableauPatientsComponent} from './patients/patient/tableau-patients/tableau-patients.component';
import {PlanningComponent} from './planning/planning.component';
import {UserComponent} from './user/user/user.component';
import {DropdownModule} from "primeng/dropdown";
import localeFr from '@angular/common/locales/fr';
import {CalendarModule as CalendarModule2} from "primeng/calendar";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {SETTINGS as AUTH_SETTINGS} from '@angular/fire/compat/auth';
import {InfirmieresModule} from "./infirmieres/infirmieres.module";
import {PatientsModule} from "./patients/patients.module";

registerLocaleData(localeFr);

@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // for firestore
    BrowserModule,
    TableModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    FormsModule,
    FlatpickrModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule2,
    InfirmieresModule,
    PatientsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    SignUpComponent,
    PasswordResetComponent,
    HeaderComponent,
    PatientComponent,
    TableauPatientsComponent,
    PlanningComponent,
    UserComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [CarService,
    {provide: AUTH_SETTINGS, useValue: {appVerificationDisabledForTesting: true}},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
