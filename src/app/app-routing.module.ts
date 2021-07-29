import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {SigninComponent} from "./authentification/signin/signin.component";
import {SignUpComponent} from "./authentification/sign-up/sign-up.component";
import {PasswordResetComponent} from "./authentification/password-reset/password-reset.component";
import {AuthGuardService} from "./services/authGuard.service";
import {PlanningComponent} from "./planning/planning.component";

const routes: Routes = [
  {path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  {path: 'login', canActivate: [AuthGuardService], component: SigninComponent},
  {path: 'planinng', component: PlanningComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'resetPassword', component: PasswordResetComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
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
