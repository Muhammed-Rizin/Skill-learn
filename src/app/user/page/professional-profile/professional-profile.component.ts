import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { professionalData } from 'src/app/professional/types/professional.types';

declare let Razorpay : any

@Component({
  selector: 'app-professional-profile',
  templateUrl: './professional-profile.component.html',
  styleUrls: ['./professional-profile.component.css']
})
export class ProfessionalProfileComponent {
  userData!: professionalData
  actualData!: professionalData
  userEmail !: string
  userId !: string

  constructor(private userService : UserService, private route: ActivatedRoute, private router : Router){
    this.route.params.subscribe((params) => {
      if(params['id']){
        this.userService.getUserDataByEmail(params['id']).subscribe(
          (data) => {
            this.userData = data
            this.userData.bio = this.userData.bio?.trim()
            this.userData.location = this.userData.location?.trim()
            this.userData.address = this.userData.address?.trim()
            this.userData.image = this.userData.image?.trim()
            this.actualData = Object.assign({}, this.userData)
        },(error) => {
          this.router.navigate(['/'])
        })

        this.userService.getUserData().subscribe((data) => {this.userEmail = data.email, this.userId = data._id})
      }else {
        this.router.navigate(['/'])
      }
    })
  }

  getRoomId(email : string) {
    if (email) {
      if(email.length > this.userEmail?.toString().length ){
        return `${this.userEmail}${email}`
      }
      return `${email}${this.userEmail}`
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
