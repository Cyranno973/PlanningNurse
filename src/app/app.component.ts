import {Component} from '@angular/core';
import firebase from "firebase";
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  constructor(public authentificationService: AuthenticationService) {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyC_br1w39YY1Ojijh0zdCUeKR8U5XZmX0A",
      authDomain: "nunurseplanning.firebaseapp.com",
      projectId: "nunurseplanning",
      storageBucket: "nunurseplanning.appspot.com",
      messagingSenderId: "1091036199432",
      appId: "1:1091036199432:web:2d4f8d30436187e325afbd",
      measurementId: "G-35DTL1Y294"
    };
    firebase.initializeApp(firebaseConfig);
  }
}
