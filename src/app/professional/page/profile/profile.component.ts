import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { professionalData } from '../../types/professional.types';
import { Review } from 'src/app/user/types/user.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData!: professionalData
  actualData !: professionalData
  validation !: string
  selectedFile!: File;
  reviews$!: Review[]
  loading: boolean = true

  pageCount : number = 1
  limit : number = 2
  totalPage !: number 
  total!: number

  imageUrl !: string | Observable<string>
  message!: string;

  dataSubscription !: Subscription
  reviewSubscription !: Subscription
  fileSubmitSubscription !: Subscription
  sendVerifyUserSubscription !: Subscription
  nextPageSubscription !: Subscription
  prevPageSubscription !: Subscription
  selectFileSubscription !: Subscription

  constructor(
    private _professionalService : ProfessionalService,
    private _router : Router
  ){}

  ngOnInit(): void {
    this.dataSubscription = this._professionalService.getProfessionalData().subscribe(
      (data) => {
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
      
      this.reviewSubscription = this._professionalService.getReviews(data._id, this.pageCount).subscribe(reviews => {
        this.reviews$ = reviews.data
        this.total = reviews.total
        this.totalPage = Math.ceil(reviews.total / this.limit)
        this.loading = false
      })
    },
    (err) => {
      if(err.status == 500) {
        localStorage.setItem('server-error' , 'server-error')
        this._router.navigate(['/professional/server-error'])
      }
    }
  )
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
        this.fileSubmitSubscription = this._professionalService.updateProfessional(this.userData).subscribe((data) => {
          this.actualData = data
        })
      }
  }

  sendVerifyUser(){
    this.loading = true
    this.sendVerifyUserSubscription = this._professionalService.sendVerifyUser().subscribe((data) => {
      this.message = data.message
      this.loading = false
    },
    (err) => {
      if(err.status == 500) {
        localStorage.setItem('server-error' , 'server-error')
        this._router.navigate(['/professional/server-error'])
      }
    }
    )
  }
  onFileSelected(e : Event) {
    const formData = new FormData()
    const inputElement = e.target as HTMLInputElement
    
    if (inputElement.files) {
      const file = inputElement.files[0];
  
      formData.append('image', file, file.name)

      this.selectFileSubscription = this._professionalService.submitFile(formData, this.userData._id).subscribe(
        (data) => {
          window.location.reload()
        },
        (err) => {
          if(err.status == 500) {
            localStorage.setItem('server-error' , 'server-error')
            this._router.navigate(['/professional/server-error'])
          }
        }
      );
    }
  }

  nextPage() {
    const page = this.pageCount + 1
    this.nextPageSubscription = this._professionalService.getReviews(this.userData._id, page).subscribe(reviews => {
      this.reviews$ = reviews.data
      this.pageCount ++ 
    })
  }

  prevPage(){
    const page = this.pageCount - 1
    this.prevPageSubscription = this._professionalService.getReviews(this.userData._id, page).subscribe(reviews => {
      this.reviews$ = reviews.data
      this.pageCount --
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription?.unsubscribe()
    this.reviewSubscription?.unsubscribe()
    this.fileSubmitSubscription?.unsubscribe()
    this.sendVerifyUserSubscription?.unsubscribe()
    this.nextPageSubscription?.unsubscribe()
    this.prevPageSubscription?.unsubscribe()
    this.selectFileSubscription?.unsubscribe()  
  }
}
