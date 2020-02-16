import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';
import { from } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
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
    this.firebaseService.isLoggedIn$.pipe(first(),
      tap(user => {
        if (user) {
          this.router.navigate(['main/tabs/list']);
        }
      }),
      map(() => from(firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)))
    ).subscribe(() => {
      this.loadUI();
    }, error => console.log(error.code, error.message));
  }

  loadUI() {
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInSuccessUrl: 'main/tabs/list',
      signInOptions: [
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.router.navigate(['main/tabs/list']);
          return false;
        },
      },
    });
  }
}
