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
                console.log("compte creer");
              }
            ).catch(
            (error) => {
              reject(error);
            }
          )
        } else {
          reject("Mot de passe differents");
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
          ).catch(
          (error) => {
            reject("Mot de passe ou identifiant invalide");
          }
        )
      }))
    )
  }

  signOut() {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signOut()
          .then(
            () => {
              console.log("vous etes deconnecter");
              this.router.navigate(['login']);
            })
      }
    )
  }

  resetPassword(email: string) {
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log("Un mail permetant le reset de votre password vous à été envoyer");
      })
      .catch(error => console.log(error.message));
  }
}
