import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { userData } from '../../types/user.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userData!: userData
  actualData!: userData
  validation !: string
  selectedFile!: File;

  constructor(private _userService : UserService ){
    this._userService.getUserData().subscribe((data) => {
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
        this._userService.updateUser(this.userData).subscribe((data) => this.userData = data)
      }
  }

  sendVerifyUser(){
    this._userService.sendVerifyUser().subscribe()
  }
 
  // onFileSelected(event : Event) {
  //   const formData = new FormData()
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.selectedFile = inputElement.files[0];
  //     formData.append("profile", this.selectedFile, this.selectedFile.name)
  //     this._userService.submitFile(formData, this.userData._id).subscribe((data) => {
  //       window.location.reload()
  //     })
  //   }
  // }
  onFileSelected(e : Event) {
    const formData = new FormData()
    const inputElement = e.target as HTMLInputElement

    if (inputElement.files) {
      const file = inputElement.files[0];
  
      formData.append('image', file, file.name)
      this._userService.submitFile(formData, this.userData._id).subscribe(
        (data) => {},
        (error) => {
        }
      );
    }
  }
}
