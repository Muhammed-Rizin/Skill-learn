import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerUser } from '../../store/user.action';
import { Observable, map } from 'rxjs';
import { selectRegisterError, selectRegisterUserData } from '../../store/user.selector';
import { registerUserType, userData } from '../../types/user.types';
import { UserService } from 'src/app/services/user/user.service';

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
  
  
  characters : boolean = false
  lowerCase : boolean = false
  upperCase : boolean = false
  oneNumber : boolean = false


  error$ : Observable<String> | string
  error !: string
  loading!: boolean 

  pageCount : number = 1
  data : registerUserType ={
    email : null,
    password : null,
    firstName : null,
    lastName : null,
    education : null,
  }
  constructor(
    private formBuilder : FormBuilder,
    private store : Store,
    private _userService : UserService
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
        password : ['', Validators.required]
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
      this.emailSubmit()
    }
    // Password
    else if(this.pageCount === 2){
      this.passwordSubmit()
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

    this.error$ = ""
  }

  passwordSubmit() {
    if(this.oneNumber && this.upperCase && this.lowerCase && this.characters){
      this.data['password'] = this.passwordForm.value.password
      this.pageCount++
      this.error = ""
    }else {
      this.error = "Password must be strong"
      this.markFormControlsAsTouched(this.passwordForm)
    }
  }

  passwordCheck(){
    const password = this.passwordForm.value.password

    if (password.length >= 8) {
      this.characters = true
    }else {
      this.characters = false
    }
    if (/[A-Z]/.test(password)) {
      this.upperCase = true
    }else {
      this.upperCase = false
    }
    if (/[a-z]/.test(password)) {
      this.lowerCase = true
    }else {
      this.lowerCase = false
    }
    if (/\d/.test(password)) {
      this.oneNumber = true
    }else {
      this.oneNumber = false
    }

    if(this.oneNumber && this.upperCase && this.lowerCase && this.characters){
      this.error = ""
    }
  }

  back(){
    this.pageCount--
    this.error$ = ""
  }

  submit() {
    if(this.educationForm.valid){
      this.data['education'] = this.educationForm.value.education
      const data = this.data
      this.loading = true
      this.store.dispatch(registerUser({userData : data}))
      this.error$ = ""
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

  emailSubmit() {
    if(this.emailForm.valid){
      this.loading = true
      const emailData = this.emailForm.getRawValue()
      this._userService.checkEmail(emailData.email).subscribe(
        (res) => {
          this.data.email = emailData?.email || ''
          this.pageCount++
          this.loading = false
        },
        (err) => {
          if(err.status === 400) {
            this.error$ = err.error.message
            this.loading = false
          }
        }
      )

    }else {
      this.markFormControlsAsTouched(this.emailForm);
    }
  }
}
