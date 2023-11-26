import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfessionalService } from '../../services/professional/professional.service';

@Injectable({
  providedIn: 'root'
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate() {
    const admin = localStorage.getItem('admin_jwt');
    const user = localStorage.getItem('userJwt');
    if (admin) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else if (user) {
       this.router.navigate(['/']);
       return false;
    } else {
      return true;
    }
  }
}
