import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalAuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('professional_token');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/professional/login']);
      return false;
    }
  }
}
