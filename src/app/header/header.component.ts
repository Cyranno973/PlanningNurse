import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import firebase from "firebase";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(public authentificationService: AuthenticationService) {
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }

  onSignOut() {
    this.authentificationService.signOut();
  }
}
