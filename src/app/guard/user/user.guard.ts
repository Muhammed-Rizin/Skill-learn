import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAvailable implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('userJwt');
    if (token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
