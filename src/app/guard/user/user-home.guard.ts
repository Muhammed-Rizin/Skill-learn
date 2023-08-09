import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class HomeGuard implements CanActivate {
    constructor(private router: Router) {}
    canActivate() {
      this.router.navigate(['/home'])
      return false
    }
  }