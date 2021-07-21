import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passwordResetForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authentificationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.initPassReset();
  }

  initPassReset() {
    this.passwordResetForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]]
      }
    )
  }

  onSubmitPasswordReset() {
    const email = this.passwordResetForm.get('email').value;
    this.authentificationService.resetPassword(email);
  }
}
