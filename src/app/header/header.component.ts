import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private fa: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.fa.onAuthStateChanged(
      (user) => {
        this.isAuth = !!user;
      }
    )
  }

  onSignOut() {

  }
}
