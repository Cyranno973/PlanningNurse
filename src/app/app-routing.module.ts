import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SigninComponent} from "./authentification/signin/signin.component";
import {SignUpComponent} from "./authentification/sign-up/sign-up.component";
import {PasswordResetComponent} from "./authentification/password-reset/password-reset.component";
import {PlanningComponent} from "./planning/planning.component";
import {PatientComponent} from "./patients/patient/patient.component";
import {SoignantsComponent} from "./soignants/soignants.component";
import {PatientsComponent} from "./patients/patients.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'logina', component: SigninComponent},
  {path: 'planning', component: PlanningComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'resetPassword', component: PasswordResetComponent},

  // Nouvelles routes
  {path: 'patients', component: PatientsComponent},
  {path: 'patients/:id', component: PatientComponent},
  {path: 'infirmieres', component: SoignantsComponent},
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
