import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfessionalService } from '../services/professional/professional.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalGuard implements CanActivate {
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


@Injectable({
  providedIn: 'root',
})
export class professionalBackGuard implements CanActivate {
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

@Injectable({
  providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
  constructor(private router : Router){}

  canActivate() {
    const admin = localStorage.getItem('admin_jwt');
    const user = localStorage.getItem('userjwt');
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


@Injectable({
  providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const token = localStorage.getItem('admin_token');
    const user = localStorage.getItem('userjwt');

    if (token) {
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


@Injectable({
  providedIn: 'root'
})
export class ProfessionalBlockedGuard implements CanActivate {
  constructor(private router : Router,private professionalService : ProfessionalService) {}
  canActivate(): Observable<boolean> {
    return this.professionalService.isBlocked().pipe(
      map((isBlocked: boolean) => {
        if (isBlocked) {
          localStorage.clear()
          this.router.navigate(['/professional'])
          return false;
        } else {
          return true;
        }
      }),
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class ProfessionalApprovedGuard implements CanActivate {
  constructor(private router : Router,private professionalService : ProfessionalService) {}
  canActivate(): Observable<boolean> {
    return this.professionalService.isApproved().pipe(
      map((isApproved: boolean) => {
        if (isApproved) {
          return true;
        } else {
          this.router.navigate(['/professional/profile'])
          return false;
        }
      }),
    );
  }

}
@Injectable({
  providedIn:'root'
})
export class  ProfessionalchatGuard implements CanActivate{
  constructor(private router : Router) {}
  canActivate() {
    this.router.navigate(['/professional/chat'])
    return false
  }
}