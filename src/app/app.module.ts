import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {TableModule} from "primeng/table";
import {CarService} from "./home/car.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    TableModule,
    BrowserAnimationsModule
  ],
  providers: [CarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
