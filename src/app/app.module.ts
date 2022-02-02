import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {TableModule} from "primeng/table";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {CommonModule, registerLocaleData} from '@angular/common';
import {SigninComponent} from './authentification/signin/signin.component';
import {AppRoutingModule} from './app-routing.module';
import {SignUpComponent} from './authentification/sign-up/sign-up.component';
import {PasswordResetComponent} from './authentification/password-reset/password-reset.component';
import {HeaderComponent} from './header/header.component';
import {UserComponent} from './user/user/user.component';
import localeFr from '@angular/common/locales/fr';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {SETTINGS as AUTH_SETTINGS} from '@angular/fire/compat/auth';
import {PatientsModule} from "./patients/patients.module";
import {PlanningModule} from "./planning/planning.module";
import {HomeModule} from "./home/home.module";
import {ReactiveFormsModule} from "@angular/forms";
import {SoignantsModule} from "./soignants/soignants.module";

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
    AppRoutingModule,
    HomeModule,
    SoignantsModule,
    PatientsModule,
    PlanningModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    SigninComponent,
    SignUpComponent,
    PasswordResetComponent,
    HeaderComponent,
    UserComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: AUTH_SETTINGS, useValue: {appVerificationDisabledForTesting: true}},],
  bootstrap: [AppComponent]
})
export class AppModule {
}
