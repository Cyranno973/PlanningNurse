import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  constructor(private authentification: AuthenticationService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signUpForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordVerif: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
  }

  onSubmitSignUpForm() {
    console.log('lola');
    console.log(this.signUpForm.value);
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const passwordVerif = this.signUpForm.get('passwordVerif').value;

    this.authentification.signUpUser(email, password, passwordVerif).then(
      () => {
        console.log("okay")
      }
    ).catch(
      (error) => {
        console.log(error);
        this.errorMessage = error;
      }
    );
  }
}
