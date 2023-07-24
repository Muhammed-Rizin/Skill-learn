import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getProfessionalDetails, newPassword } from '../../store/professional.actions';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  form !: FormGroup
  token !: string;
  constructor(private formBuilder : FormBuilder, private route: ActivatedRoute, private store : Store){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password : ['', [Validators.minLength(8), Validators.required]]
    })

    this.route.queryParams
      .subscribe(params => {
        this.token = params['token']
      }
    );

    const token = this.token

    this.store.dispatch(getProfessionalDetails({token}))
  }
  submit(){
    const data = this.form.getRawValue()
    if(this.form.valid){
      console.log(data, this.token)
      const token = this.token
      this.store.dispatch(newPassword({token, password : data.password}))
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
