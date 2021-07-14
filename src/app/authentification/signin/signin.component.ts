import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authentification: AuthenticationService) {
  }

  ngOnInit() {
    this.initSigninForm();
  }

  initSigninForm() {
    this.signinForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
      }
    )
  }

  onSubmitSigninForm() {
    console.log(this.signinForm.value);
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    this.authentification.signInUser(email, password).then(
      () => {
        console.log("okay")
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }
}
