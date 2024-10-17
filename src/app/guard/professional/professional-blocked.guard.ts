import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfessionalService } from '../../services/professional/professional.service';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalBlockedGuard implements CanActivate {
  constructor(
    private router: Router,
    private professionalService: ProfessionalService,
  ) {}
  canActivate(): Observable<boolean> {
    return this.professionalService.isBlocked().pipe(
      map((isBlocked: boolean) => {
        if (isBlocked) {
          localStorage.clear();
          this.router.navigate(['/professional']);
          return false;
        } else {
          return true;
        }
      }),
    );
  }
}
