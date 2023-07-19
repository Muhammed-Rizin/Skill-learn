import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
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


@Injectable({
  providedIn: 'root',
})
export class adminBackGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('admin_jwt');
    if (token) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate() {
    const professional = localStorage.getItem('professional_token');
    const user = localStorage.getItem('userjwt');
    if (professional) {
      this.router.navigate(['/professional']);
      return false;
    } else if (user) {
       this.router.navigate(['/']);
       return false;
    } else {
      return true;
    }
  }
}


@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('professional_token');
    const user = localStorage.getItem('userjwt');

    if (token) {
      this.router.navigate(['/professional']);
      return false;
    } else if (user) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
