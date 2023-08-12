import { Component, OnInit } from '@angular/core';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { PaymentData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit{
  paymentHistory !: PaymentData[]
  loading : boolean = true
  constructor(
    private professionalService : ProfessionalService
  ){}
  ngOnInit(): void {
      this.professionalService.getPayments().subscribe(
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