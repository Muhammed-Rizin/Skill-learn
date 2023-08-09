import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfessionalService } from 'src/app/services/professional/professional.service';
import { Payment, userData } from 'src/app/user/types/user.types';
import { Task } from '../../types/professional.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-new',
  templateUrl: './task-new.component.html',
  styleUrls: ['./task-new.component.css']
})
export class TaskNewComponent implements OnInit{
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
        task : ['', [Validators.required ,Validators.minLength(5)]],
        description : ['', [Validators.required ,Validators.minLength(10)]],
        endtime : ['',Validators.required],
        enddate : ['',Validators.required],
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
    console.log(this.form.valid)
    if(this.form.valid){
      const values = this.form.getRawValue()

      const endTimeParts = values.endtime.split(':');
      const endTime = new Date(values.enddate);
      endTime.setHours(Number(endTimeParts[0]), Number(endTimeParts[1]), 0, 0);

      values.endtime = endTime
      this._professionalService.addTask(values).subscribe((data) => {
        this._router.navigate(['/professional/tasks'])
      })
    }else {
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


