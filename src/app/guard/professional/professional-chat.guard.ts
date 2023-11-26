import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProfessionalService } from '../../services/professional/professional.service';

@Injectable({
  providedIn: 'root'
})

export class  ProfessionalChatGuard implements CanActivate{
  constructor(private router : Router) {}
  canActivate() {
    this.router.navigate(['/professional/chat'])
    return false
  }
}