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
  loading!: boolean

  addReview: boolean = false
  reviewForm!: FormGroup
  reviews$!: Review[]

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
            this.userService.getReviews(data._id).subscribe(reviews => {
              console.log(reviews)
              this.reviews$ = reviews
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
        console.log(data , 'subscribed')
        if (data.createdAt) {
          const createdAtDate = new Date(data.createdAt);
          if (createdAtDate.getDate() + 30 <= Date.now()) {
            this.subscribed = true;
          }
        }
      });
    });
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
      this.userService.addReview(data,this.userData._id).subscribe()
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
}
