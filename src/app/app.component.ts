import {Component} from '@angular/core';
// import firebase from "firebase";
import {AngularFireAuth} from "@angular/fire/auth";
import firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(public auth: AngularFireAuth) {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    //
    //   firebase.initializeApp(firebaseConfig);
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut();
  }

}

