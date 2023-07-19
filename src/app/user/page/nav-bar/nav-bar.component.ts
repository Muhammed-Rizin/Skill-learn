import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private router : Router, 
    readonly userService : UserService
  ) {
  }
  logOut(){
    localStorage.removeItem('userjwt')
    this.router.navigate(['/'])
  }
}
