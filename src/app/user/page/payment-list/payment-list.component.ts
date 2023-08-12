import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Payment, PaymentData } from '../../types/user.types';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit{
  paymentHistory !: PaymentData[]
  loading : boolean = true
  constructor(
    private userService : UserService
  ){}
  ngOnInit(): void {
      this.userService.getPayments().subscribe(
        (data) => {
          this.paymentHistory = data
          this.loading = false
        }
      )
  }

  status(value : Date ) : boolean {
    const createdAtDate = new Date(value)
    if (createdAtDate.getDate() + 30 <= Date.now()) {
      return true
    }
    return false
  }
}
