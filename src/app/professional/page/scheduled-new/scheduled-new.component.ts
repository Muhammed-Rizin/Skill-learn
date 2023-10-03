import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { userData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-scheduled-new',
  templateUrl: './scheduled-new.component.html',
  styleUrls: ['./scheduled-new.component.css']
})
export class ScheduledNewComponent implements OnInit, OnDestroy {
  form !: FormGroup
  users: userData[] = []
  loading$: boolean = true

  subscribers !: Subscription
  schedule !: Subscription

    constructor(
  private _formBuilder: FormBuilder,
  private _professionalService: ProfessionalService,
  private _router: Router
  ){ }

ngOnInit(): void {
  this.form = this._formBuilder.group({
    user: ['', [Validators.required]],
    topic: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    time: ['', Validators.required],
    date: ['', Validators.required],
  })

  this.subscribers = this._professionalService.getSubscribers().subscribe(data => {
    data.filter((value) => {
      const createdAtDate = new Date(value.createdAt as Date)
      const currentDate = new Date();

      const timeDifference = currentDate.getTime() - createdAtDate.getTime();
      const oneWeekInMillis = 30 * 24 * 60 * 60 * 1000;

      if (timeDifference <= oneWeekInMillis) {
        this.users.push(value.from as userData)
      }
    })
    this.loading$ = false
  })
}

ngOnDestroy(): void {
    this.subscribers.unsubscribe()
    this.schedule.unsubscribe()
}

submitForm() {
  if (this.form.valid) {
    const values = this.form.getRawValue()

    const endTimeParts = values.time.split(':');
    const endTime = new Date(values.date);
    endTime.setHours(Number(endTimeParts[0]), Number(endTimeParts[1]), 0, 0);

    values.time = endTime
    this.schedule = this._professionalService.scheduleMeeting(values).subscribe(
      (data) => {
        this._router.navigate(['/professional/schedule'])
      },
      (err) => {
        if (err.status == 500) {
          localStorage.setItem('server-error', 'server-error')
          this._router.navigate(['/professional/server-error'])
        }
      }
    )
  } else {
    this.markFormControlsAsTouched(this.form);
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
