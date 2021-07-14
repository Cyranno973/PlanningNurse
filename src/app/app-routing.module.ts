import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SigninComponent} from "./authentification/signin/signin.component";
import {SignUpComponent} from "./authentification/sign-up/sign-up.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: SigninComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
