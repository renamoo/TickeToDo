import { Injectable } from '@angular/core';
import { firebaseConfig } from 'firebase.init';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app: firebase.app.App;
  user: firebase.User;

  constructor() { }

  init() {
    this.app = firebase.initializeApp(firebaseConfig);
    // firebase.analytics();
    this.app.auth().onAuthStateChanged(user => {
      this.user = user;
    });
  }

  getUser() {
    return this.user;
  }
}
