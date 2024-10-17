import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserBlockedGuard implements CanActivate {
  constructor(private userService: UserService) {}
  canActivate(): Observable<boolean> {
    return this.userService.isBlocked().pipe(
      map((isBlocked: boolean) => {
        if (isBlocked) {
          localStorage.clear();
          return false;
        } else {
          return true;
        }
      }),
    );
  }
}
