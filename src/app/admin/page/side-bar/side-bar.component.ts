import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {
  constructor(private router : Router){}
  logOut(){
    localStorage.removeItem('admin_jwt')
    this.router.navigate(['/admin'])
  }
}
