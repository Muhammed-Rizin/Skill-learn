import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfessionalService } from 'src/app/services/professional/professional.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(
    private router : Router, 
    readonly professioanlService : ProfessionalService
  ) {
  }
  logOut(){
    localStorage.removeItem('professional_token')
    this.router.navigate(['/professional/login'])
  }
}
