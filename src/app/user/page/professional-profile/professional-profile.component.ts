import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user/user.service';
import { professionalData } from 'src/app/professional/types/professional.types';
import { Review } from '../../types/user.types';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

declare let Razorpay : any

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.component.html',
  styleUrls: ['./professional-profile.component.css']
})
export class ProfessionalProfileComponent implements OnInit, OnDestroy{
  secret = environment.crypto_secret
  userData!: professionalData
  actualData!: professionalData
  userEmail !: string
  userId !: string
  subscribed : boolean = false
  loading: boolean = true

  addReview: boolean = false
  reviewSubmitted : boolean = false
  reviewForm!: FormGroup
  reviews$!: Review[]

  pageCount : number = 1
  limit : number = 2
  totalPage !: number 
  total!: number
  averageReview !: number

  userLogined : boolean = localStorage.getItem('userJwt') ? true : false

  professionalDataSubscription !: Subscription
  reviewsSubscription !: Subscription
  userDataSubscription !: Subscription
  prevPageSubscription !: Subscription
  nextPageSubscription !: Subscription
  addReviewSubscription !: Subscription
  subscribedSubscription !: Subscription

  constructor(
    private userService : UserService, 
    private route: ActivatedRoute, 
    private router : Router,
    private _formBuilder : FormBuilder
  ){
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.professionalDataSubscription = this.userService.getProfessionalDataById(params['id']).subscribe(
          (data) => {
            this.processUserData(data)
            console.log(this.userLogined)
            if(this.userLogined) {
              this.checkSubscriptionStatus()
            }
            this.reviewsSubscription = this.userService.getReviews(data._id, this.pageCount).subscribe(reviews => {
              this.reviews$ = reviews.data
              this.total = reviews.total
              this.totalPage = Math.ceil(reviews.total / this.limit)
              this.loading = false
              this.averageReview = reviews.average
            })
          },
          (err) => {
            if(err.status == 500) {
              localStorage.setItem('server-error' , 'server-error')
              this.router.navigate(['/server-error'])
            }
            if(err.status == 404){
              this.router.navigate(['/not-found'])
            }
          }
        )
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
    console.log('subs ')
    this.userDataSubscription = this.userService.getUserData().subscribe((data) => {
      this.userEmail = data.email;
      this.userId = data._id;
      this.subscribedSubscription = this.userService.subscribed(this.userId, this.userData._id).subscribe(
        (data) => {
          if (data.createdAt) {
            this.subscribed = this.status(data.createdAt)
          }
        },
        (err) => {
          if(err.status == 500) {
            localStorage.setItem('server-error' , 'server-error')
            this.router.navigate(['/server-error'])
          }
        }
      );
    });
  }


  status(value: Date): boolean {
    const createdAtDate = new Date(value);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const oneWeekInMilliSecond = 30 * 24 * 60 * 60 * 1000;

    if (timeDifference <= oneWeekInMilliSecond) {
        return true;
    }
    return false; 
  }

  getRoomId(id : string) {
    if (id) {
      return `${id}${this.userId}`
    }
    return null
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
          .subscribe(
            (data) => {
              this.router.navigate(['/ordersuccess'])
            },
            (err) => {
              if(err.status == 500) {
                localStorage.setItem('server-error' , 'server-error')
                this.router.navigate(['/server-error'])
              }
            }
          )
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
      const data = this.reviewForm.getRawValue()
      this.reviewSubmitted = true
      this.addReviewSubscription = this.userService.addReview(data,this.userData._id).subscribe(
        (data) =>{
         window.location.reload()
        },
        (err) => {
          if(err.status == 500) {
            localStorage.setItem('server-error' , 'server-error')
            this.router.navigate(['/server-error'])
          }
        }
      )
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
    this.nextPageSubscription = this.userService.getReviews(this.userData._id, page).subscribe(reviews => {
      this.reviews$ = reviews.data
      this.pageCount ++ 
    })
  }

  prevPage(){
    const page = this.pageCount - 1
    this.prevPageSubscription = this.userService.getReviews(this.userData._id, page).subscribe(reviews => {
      this.reviews$ = reviews.data
      this.pageCount --
    })
  }

  ngOnDestroy(): void {
    this.professionalDataSubscription?.unsubscribe()
    this.reviewsSubscription?.unsubscribe()
    this.userDataSubscription?.unsubscribe()
    this.prevPageSubscription?.unsubscribe()
    this.nextPageSubscription?.unsubscribe()
    this.addReviewSubscription?.unsubscribe()
    this.subscribedSubscription?.unsubscribe()
  }
}
