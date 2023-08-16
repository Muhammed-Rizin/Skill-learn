import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerUser } from '../../store/user.action';
import { Observable, map } from 'rxjs';
import { selectRegisterError, selectRegisterUserData } from '../../store/user.selector';
import { registerUserType, userData } from '../../types/user.types';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  emailForm !: FormGroup
  passwordForm !: FormGroup
  userNameForm !: FormGroup
  educationForm !: FormGroup

  error$ : Observable<String> | string

  pageCount : number = 1
  data : registerUserType = {
    email: null,
    password: null,
    firstName: null,
    lastName: null,
    education: null
  }
  constructor(
    private formBuilder : FormBuilder,
    private store : Store
  ){
    this.error$ = this.store.pipe(
      select(selectRegisterError),
      map((doc: string) => (this.error$ = doc))
    );
    this.error$?.subscribe((doc) => doc)
  }

  ngOnInit(): void {
      this.emailForm = this.formBuilder.group({
        email : ['', [Validators.required, Validators.email]]
      })
      this.passwordForm = this.formBuilder.group({
        password : ['', [Validators.minLength(8), Validators.required]]
      })
      this.userNameForm = this.formBuilder.group({
        firstName : ['', Validators.required],
        lastName : ['', Validators.required]
      })
      this.educationForm = this.formBuilder.group({
        education : ['', Validators.required]
      })
  }
  next(){
    // Email 
    if(this.pageCount === 1){
      if(this.emailForm.valid){
        const emailData = this.emailForm.getRawValue()
        console.log(emailData)
        this.data.email = emailData.email || ''
        this.pageCount++
      }else {
        this.markFormControlsAsTouched(this.emailForm);
      }
    }
    // Password
    else if(this.pageCount === 2){
      if(this.passwordForm.valid){
        this.data['password'] = this.passwordForm.value.password
        this.pageCount++
      }else {
        this.markFormControlsAsTouched(this.passwordForm)
      }
    }

    // UserName 
    else{
      if(this.userNameForm.valid){
        this.data['firstName'] = this.userNameForm.value.firstName
        this.data['lastName'] = this.userNameForm.value.lastName
        this.pageCount++
      }else {
        this.markFormControlsAsTouched(this.userNameForm)
      }
    }
  }

  back(){
    this.pageCount--
  }

  submit() {
    if(this.educationForm.valid){
      this.data['education'] = this.educationForm.value.education
      const data = this.data
      this.store.dispatch(registerUser({userData : data}))
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
