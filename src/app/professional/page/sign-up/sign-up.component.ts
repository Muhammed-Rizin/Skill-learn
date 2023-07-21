import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { professionalData } from '../../types/professional.types';
import { professionalRegister } from '../../store/professional.actions';
import { selectRegisterError, selectRegisterLoading, selectRegisterUserData } from '../../store/professional.selector';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  emailForm !: FormGroup
  passwordForm !: FormGroup
  userNameForm !: FormGroup
  educationForm !: FormGroup

  error$ : Observable<String> | string
  data$ : Observable<professionalData> | string
  loading$ : Observable<boolean> | boolean

  pageCount : number = 1
  data : any = {}
  constructor(
    private formBuilder : FormBuilder,
    private store : Store
  ){
    this.error$ = this.store.pipe(
      select(selectRegisterError),
      map((doc: any) => (this.error$ = doc))
    );
    this.error$?.subscribe((doc) => doc)

    this.data$ = this.store.pipe(
      select(selectRegisterUserData),
      map((doc: any) => (this.data$ = doc))
    );
    this.data$?.subscribe((doc: professionalData) => doc);

    this.loading$ = this.store.pipe(
      select(selectRegisterLoading),
      map((doc: any) => (this.loading$ = doc))
    );
    this.loading$?.subscribe((doc: boolean) => doc);
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
        this.data['email'] = emailData.email
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
      this.store.dispatch(professionalRegister(this.data))
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
