import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {

  constructor(
    private router: Router,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.isLoggedIn();
    this.loadUI();
  }

  isLoggedIn() {
    const user = this.firebaseService.getUser();
    if (user) {
      this.router.navigate(['main/tabs/daily']);
    }
  }

  loadUI() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: 'main/tabs/daily',
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.router.navigate(['main/tabs/daily']);
          return false;
        },
      },
    });
  }
}
