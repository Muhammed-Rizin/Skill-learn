import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthentication implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('admin_jwt');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/admin']);
      return false;
    }
  }
}
