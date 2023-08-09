import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ConsecutiveGuard implements CanActivate {
    constructor(private router: Router) { }

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