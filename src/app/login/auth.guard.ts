import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  canActivate() {
    const user = this.firebaseService.getUser();
    if (!user) {
      this.router.navigate(['/login']);
    }
    return !!user;
  }
}
