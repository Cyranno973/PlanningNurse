import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SigninComponent} from "./authentification/signin/signin.component";
import {SignUpComponent} from "./authentification/sign-up/sign-up.component";
import {PasswordResetComponent} from "./authentification/password-reset/password-reset.component";
import {PlanningComponent} from "./planning/planning.component";
import {PatientComponent} from "./patient/patient.component";
import {InfirmieresComponent} from "./infirmieres/infirmieres.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'logina', component: SigninComponent},
  // {path: 'planinng', canActivate: [AuthGuardService], component: PlanningComponent},
  {path: 'planinng', component: PlanningComponent},
  {path: 'patient', component: PatientComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'resetPassword', component: PasswordResetComponent},
  {path: 'infirmieres', component: InfirmieresComponent},
  // {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
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
