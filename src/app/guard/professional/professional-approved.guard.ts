import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfessionalService } from '../../services/professional/professional.service';

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