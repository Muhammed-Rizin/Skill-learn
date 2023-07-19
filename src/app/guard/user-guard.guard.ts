import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate() {
    const token = localStorage.getItem('userjwt');
    if (token) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class UserBackGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('userjwt');
    if (token) {
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
export class ConsecutiveGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate() {
    const admin = localStorage.getItem('admin_jwt');
    const professional = localStorage.getItem('professional_token');
    if (admin) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else if (professional) {
       this.router.navigate(['/professional']);
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
    const token = localStorage.getItem('admin_jwt');
    const professional = localStorage.getItem('professional_token');

    if (token) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    } else if (professional) {
      this.router.navigate(['/professional']);
      return false;
    } else {
      return true;
    }
  }
}