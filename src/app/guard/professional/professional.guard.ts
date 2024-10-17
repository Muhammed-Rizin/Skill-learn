import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('professional_token');
    if (token) {
      this.router.navigate(['/professional']);
      return false;
    } else {
      return true;
    }
  }
}
