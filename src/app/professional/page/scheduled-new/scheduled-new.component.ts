import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { userData } from 'src/app/user/types/user.types';

@Component({
  selector: 'app-scheduled-new',
  templateUrl: './scheduled-new.component.html',
  styleUrls: ['./scheduled-new.component.css']
})
export class ScheduledNewComponent implements OnInit {
  form !: FormGroup
  users : userData[] = []
  constructor(
    private _formBuilder : FormBuilder,
    private _professionalService : ProfessionalService,
    private _router : Router
  ){}

  ngOnInit(): void {
      this.form = this._formBuilder.group({
        user : ['', [Validators.required]],
        topic : ['', [Validators.required ,Validators.minLength(10)]],
        description : ['', [Validators.required ,Validators.minLength(20)]],
        time : [''],
        date : [''],
      })

      this._professionalService.getSubscribers().subscribe(data => {
        data.filter((value) => {
          const createdAtDate = new Date(value.createdAt as Date);
            if (createdAtDate.getDate() + 30 <= Date.now()) {
              this.users.push(value.from as userData)
            }
        })
      })
  }

  submitForm() {
    if(this.form.valid){
      const values = this.form.getRawValue()

      const endTimeParts = values.time.split(':');
      const endTime = new Date(values.date);
      endTime.setHours(Number(endTimeParts[0]), Number(endTimeParts[1]), 0, 0);

      values.time = endTime
      this._professionalService.scheduleMeeting(values).subscribe((data) => {
        this._router.navigate(['/professional/schedule'])
      })
    }else {
      // validation
    }
  }
}
