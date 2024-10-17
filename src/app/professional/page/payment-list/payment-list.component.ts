import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { PaymentData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css'],
})
export class PaymentListComponent implements OnInit, OnDestroy {
  paymentHistory!: PaymentData[];
  loading: boolean = true;

  pageCount: number = 1;
  limit: number = 10;
  totalPage!: number;

  paymentHistorySubscription!: Subscription;

  constructor(
    private professionalService: ProfessionalService,
    private _router: Router,
  ) {}
  ngOnInit(): void {
    this.handlePaymentData();
  }

  handlePaymentData() {
    this.paymentHistorySubscription = this.professionalService
      .getPayments(this.pageCount, this.limit)
      .subscribe(
        (data) => {
          this.paymentHistory = data.data;
          this.totalPage = Math.ceil(data.total / this.limit);
          this.loading = false;
        },
        (err) => {
          if (err.status == 500) {
            localStorage.setItem('server-error', 'server-error');
            this._router.navigate(['/professional/server-error']);
          }
        },
      );
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

  nextPage() {
    this.pageCount++;
    this.handlePaymentData();
  }

  prevPage() {
    this.pageCount--;
    this.handlePaymentData();
  }

  ngOnDestroy(): void {
    this.paymentHistorySubscription?.unsubscribe();
  }
}
