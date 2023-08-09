import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CryptoJS from 'crypto-js';

import { UserService } from 'src/app/services/user/user.service';
import { professionalData } from 'src/app/professional/types/professional.types';

declare let Razorpay : any

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.component.html',
  styleUrls: ['./professional-profile.component.css']
})
export class ProfessionalProfileComponent {
  secret = "crypto-js"
  userData!: professionalData
  actualData!: professionalData
  userEmail !: string
  userId !: string
  subscribed : boolean = false
  loading!: boolean

  constructor(
    private userService : UserService, 
    private route: ActivatedRoute, 
    private router : Router,
    private _store : Store
  ){
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.userService.getProfessionalDataByEmail(params['id']).subscribe(
          (data) => {
            this.processUserData(data)
            this.checkSubscriptionStatus()
        })
      }else {
        this.router.navigate(['/'])
      }
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
  
  
}
