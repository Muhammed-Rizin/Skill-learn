import { Component } from '@angular/core';
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

  constructor(private professionalService : ProfessionalService ){
    this.professionalService.getProfessionalData().subscribe((data) => {
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
      this.actualData = Object.assign({}, this.userData)
    })
  }

  ngOnInit(): void {
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
        this.professionalService.updateProfessional(this.userData).subscribe()
      }
  }

  sendVerifyUser(){
    this.professionalService.sendVerifyUser().subscribe()
  }
}
