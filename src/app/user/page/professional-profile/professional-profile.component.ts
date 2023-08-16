import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';

import { UserService } from 'src/app/services/user/user.service';
import { professionalData } from 'src/app/professional/types/professional.types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../types/user.types';

declare let Razorpay : any

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.component.html',
  styleUrls: ['./professional-profile.component.css']
})
export class ProfessionalProfileComponent implements OnInit{
  secret = "crypto-js"
  userData!: professionalData
  actualData!: professionalData
  userEmail !: string
  userId !: string
  subscribed : boolean = false
  loading: boolean = true

  addReview: boolean = false
  reviewForm!: FormGroup
  reviews$!: Review[]

  pageCount : number = 1
  limit : number = 5
  totalPage !: number 
  total!: number

  constructor(
    private userService : UserService, 
    private route: ActivatedRoute, 
    private router : Router,
    private _store : Store,
    private _formBuilder : FormBuilder
  ){
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.userService.getProfessionalDataByEmail(params['id']).subscribe(
          (data) => {
            this.processUserData(data)
            this.checkSubscriptionStatus()
            this.userService.getReviews(data._id, this.pageCount).subscribe(reviews => {
              this.reviews$ = reviews.data
              this.total = reviews.total
              this.totalPage = Math.ceil(reviews.total / this.limit)
              this.loading = false
            })
        })
      }else {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnInit(): void {
    this.reviewForm = this._formBuilder.group({
      title : ['', [Validators.required, Validators.minLength(5)]],
      description : ['', [Validators.required, Validators.minLength(10)]],
      rating : ['', Validators.required]
    })   
  }

  averageReview() {
    const sum = this.reviews$.reduce((a, b) => a + b.rating, 0)
    return sum / this.total
  }


  processUserData(data : professionalData) {
    this.userData = data
    this.userData.bio = this.userData.bio?.trim()
    this.userData.location = this.userData.location?.trim()
    this.userData.address = this.userData.address?.trim()
    this.userData.image = this.userData.image?.trim()
  }

  private checkSubscriptionStatus(): void {
    this.userService.getUserData().subscribe((data) => {
      this.userEmail = data.email;
      this.userId = data._id;
      this.userService.subscribed(this.userId, this.userData._id).subscribe((data) => {
        if (data.createdAt) {
          this.subscribed = this.status(data.createdAt)
        }
      });
    });
  }


  status(value: Date): boolean {
    const createdAtDate = new Date(value);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const oneWeekInMillis = 30 * 24 * 60 * 60 * 1000;

    if (timeDifference <= oneWeekInMillis) {
        return true;
    }
    return false; 
  }

  getRoomId(email : string) {
    if (email) {
      if(email.length > this.userEmail?.toString().length ){
        return this.encryptString(`${this.userEmail}${email}`)
      }
      return this.encryptString(`${email}${this.userEmail}`)
    }
    return null
  }

  
  encryptString(roomId : string) {
    return CryptoJS.AES.encrypt(roomId, this.secret).toString();
  }

  paymentSubmit() {
    const amount = this.userData.payment
    const from = this.userId
    const to = this.userData._id
    const options = {
      key: 'rzp_test_JDlClODKCsuMM1',
      amount: amount as number * 100,
      currency: 'INR',
      name: 'Skill-learn',
      description: 'Registration Fee',
      image:'../../../../assets/skill learn.png',
      handler: (response: any) => {
        if (response.razorpay_payment_id) {
          this.userService.paymentSuccess({amount : amount as number, from, to , paymentId : response.razorpay_payment_id})
          .subscribe((data) => {
            this.router.navigate(['/ordersuccess'])
          })
        } else {
          console.log("payment has failed")
        }
      }
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }
  
  toggleReview () {
    this.addReview = !this.addReview
  }

  reviewSubmit() {
    if(this.reviewForm.valid){
      console.log(this.reviewForm.getRawValue())
      const data = this.reviewForm.getRawValue()
      this.userService.addReview(data,this.userData._id).subscribe((data) =>{
        window.location.reload()
      })
    }else {
      this.markFormControlsAsTouched(this.reviewForm)
    }
  }

  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }

  nextPage() {
    const page = this.pageCount + 1
    this.userService.getReviews(this.userData._id, page).subscribe(reviews => {
      this.reviews$ = reviews.data
      this.pageCount ++ 
    })
  }

  prevPage(){
    const page = this.pageCount - 1
    this.userService.getReviews(this.userData._id, page).subscribe(reviews => {
      this.reviews$ = reviews.data
      this.pageCount --
    })
  }
}
