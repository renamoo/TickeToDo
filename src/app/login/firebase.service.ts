import { Injectable } from '@angular/core';
import { firebaseConfig } from 'firebase.init';
import * as firebase from 'firebase/app';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: firebase.app.App;
  user: firebase.User;
  private _isLoggedIn$ = new ReplaySubject<firebase.User>(1);

  get isLoggedIn$() {
    return this._isLoggedIn$.asObservable();
  }

  constructor() { }

  init() {
    this.app = firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
    this.app.auth().onAuthStateChanged(user => {
      this.user = user;
      this._isLoggedIn$.next(user);
    });
  }

  getUser() {
    return this.user;
  }
}
