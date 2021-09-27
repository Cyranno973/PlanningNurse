import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private fb: AngularFireAuth) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise(
      (resolve) => {
        this.fb.onAuthStateChanged(
          (user) => {
            if (user) {
              resolve(true);
            } else {
              this.router.navigate(['logina']);
              resolve(false);
            }
          }
        )
      }
    );
  }
}
