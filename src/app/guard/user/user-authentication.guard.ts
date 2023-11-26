import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class UserAuthentication implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('userJwt');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}