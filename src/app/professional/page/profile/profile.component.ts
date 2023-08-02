import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { professionalData } from '../../types/professional.types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userData!: professionalData
  actualData!: professionalData
  validation !: string
  selectedFile!: File;

  imageUrl !: string | Observable<string>
  constructor(
    private _professionalService : ProfessionalService
  ){}

  ngOnInit(): void {
    this._professionalService.getProfessionalData().subscribe((data) => {
      this.userData = data
      this.userData.bio = this.userData.bio?.trim()
      this.userData.location = this.userData.location?.trim()
      this.userData.address = this.userData.address?.trim()
      this.userData.image = this.userData.image?.trim()
      this.userData.qualification = this.userData.qualification?.trim()
      this.userData.field = this.userData.field?.trim()
      this.userData.payment = this.userData.payment
      this.userData.work = this.userData.work?.trim()
      this.userData.about = this.userData.about?.trim()
      this._professionalService.userImage(this.userData.image).subscribe((data) => {this.imageUrl =URL.createObjectURL(data)})
      this.actualData = Object.assign({}, this.userData)
    })
  }
  submit( field : string){
    if(
      field === 'First name' && this.userData.firstName === '' ||
      field === 'Last name' &&  this.userData.lastName === '' ||
      field === 'Location' &&  this.userData.location === '' ||
      field === 'Bio' && this.userData.bio === '' ||
      field === 'Address' && this.userData.address === '' ||
      field === 'Education' && this.userData.education === '' || 
      field === "Qualification" && this.userData.qualification === '' ||
      field === "Field" && this.userData.field === '' ||
      field === "Payment" && this.userData.payment === 0 ||
      field === "Work" && this.userData.work === ''
      ){ this.validation = `${field} cannot be empty`}
      else {
        this.validation = ''
        this._professionalService.updateProfessional(this.userData).subscribe()
      }
  }

  sendVerifyUser(){
    this._professionalService.sendVerifyUser().subscribe()
  }
  onFileSelected(event : Event) {
    const formData = new FormData()
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFile = inputElement.files[0];
      formData.append("profile", this.selectedFile, this.selectedFile.name)
      this._professionalService.submitFile(formData, this.userData._id).subscribe((data) => {
        window.location.reload()
      })
    }
  }
}
