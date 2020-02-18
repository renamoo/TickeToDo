import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from '../pages/login/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  canActivate() {
    return this.firebaseService.isLoggedIn$
      .pipe(
        first(),
        map(user => {
          if (!user) { this.router.navigate(['/login']); }
          return !!user;
        })
      );
  }
}
