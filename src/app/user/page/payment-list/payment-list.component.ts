import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { PaymentData } from '../../types/user.types';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit, OnDestroy{
  paymentHistory !: PaymentData[]
  loading : boolean = true

  pageCount : number = 1
  limit : number = 10
  totalPage !: number 

  paymentDataSubscription !: Subscription

  constructor(
    private userService : UserService,
    private _router : Router
  ){}
  ngOnInit(): void {
    this.handlePaymentData()
  }

  handlePaymentData() {
    this.paymentDataSubscription = this.userService.getPayments(this.pageCount, this.limit).subscribe(
      (data) => {
        this.paymentHistory = data.data
        this.totalPage = Math.ceil(data.total / this.limit)
        this.loading = false
      },
      (err) => {
        if(err.status == 500) {
          localStorage.setItem('server-error' , 'server-error')
          this._router.navigate(['/server-error'])
        }
      }
    )
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

  nextPage() {
    this.pageCount ++ 
    this.handlePaymentData()
  }

  prevPage() {
    this.pageCount--
    this.handlePaymentData()
  }

  ngOnDestroy(): void {
    this.paymentDataSubscription.unsubscribe()
  }
}
