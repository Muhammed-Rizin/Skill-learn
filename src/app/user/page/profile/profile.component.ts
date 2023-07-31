import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { userData } from '../../types/user.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userData!: userData
  actualData!: userData
  validation !: string

  constructor(private userService : UserService ){
    this.userService.getUserData().subscribe((data) => {
      this.userData = data
      this.userData.bio = this.userData.bio?.trim()
      this.userData.location = this.userData.location?.trim()
      this.userData.address = this.userData.address?.trim()
      this.userData.image = this.userData.image?.trim()
      this.actualData = Object.assign({}, this.userData)
    })
  }

  ngOnInit(): void {
  }
  submit( field : string){
    if(
      field === 'First name' && this.userData.firstName.trim() === '' ||
      field === 'Last name' &&  this.userData.lastName.trim() === '' ||
      field === 'Location' &&  this.userData.location === '' ||
      field === 'Bio' && this.userData.bio === '' ||
      field === 'Address' && this.userData.address === '' ||
      field === 'Education' && this.userData.education.trim() === ''
      ){ this.validation = `${field} cannot be empty`}
      else {
        this.validation = ''
        this.userService.updateUser(this.userData).subscribe((data) => this.userData = data)
      }
  }

  sendVerifyUser(){
    this.userService.sendVerifyUser().subscribe()
  }
  
}
