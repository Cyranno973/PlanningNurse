import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private auth: AngularFireAuth) {
  }

  signUpUser(email: string, password: string, passwordVerif: string) {
    return new Promise(
      ((resolve, reject) => {
        if (password === passwordVerif) {
          this.auth.createUserWithEmailAndPassword(email, password)
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
        this.auth.signInWithEmailAndPassword(email, password)
          .then(() => this.router.navigate(['home']))
          .catch(() => reject("Mot de passe ou identifiant invalide"))
      }))
    )
  }

  signOut() {
    return new Promise(
      () => {
        this.auth.signOut()
          .then(
            () => {
              console.log("vous etes deconnecter");
              this.router.navigate(['login']);
            })
      }
    )
  }

  resetPassword(email: string) {
    this.auth.sendPasswordResetEmail(email)
      .then(() => {
        console.log("Un mail permetant le reset de votre password vous à été envoyer");
      })
      .catch(error => console.log(error.message));
  }
}
