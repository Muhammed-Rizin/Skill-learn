import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {
    constructor(private router: Router) { }

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