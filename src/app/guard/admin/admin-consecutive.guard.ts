import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ConsecutiveGuard implements CanActivate {
    constructor(private router: Router) { }

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