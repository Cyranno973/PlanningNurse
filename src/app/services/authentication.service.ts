import {Injectable} from '@angular/core';
import firebase from "firebase";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
  }

  signUpUser(email: string, password: string, passwordVerif: string) {
    return new Promise(
      ((resolve, reject) => {
        if (password === passwordVerif) {
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
              () => {
                console.log("connecter")
              }
            ).catch(
            (error) => {
              reject(error);
            }
          )
        } else {
          console.log('mot de passe differents');
        }
      })
    )
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((result) => {
              this.router.navigate(['home']);
            }
          )
      }))
    )
  }

  signOut() {
    console.log("yoyoyo");
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signOut()
          .then(
            () => {
              this.router.navigate(['home']);
              firebase.auth().
            })
      }
    )
  }
}
