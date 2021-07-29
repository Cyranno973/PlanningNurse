import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;

  constructor(private authentification: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        // Validators.pattern pour obliger au moins 6 caractères alphanumériques, ce qui correspond au minimum requis par Firebase ;
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
        passwordVerif: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      }
    )
  }

  onSubmitSignUpForm() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const passwordVerif = this.signUpForm.get('passwordVerif').value;
// TODO if password non identique faire quelque chose
    this.authentification.signUpUser(email, password, passwordVerif).then(
      () => {
        console.log("okay")
        this.router.navigate(['login']);
      }
    ).catch(
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
  }
}
