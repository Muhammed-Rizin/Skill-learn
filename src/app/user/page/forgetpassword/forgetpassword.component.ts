import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { forgotEmailUser } from '../../store/user.action';
import { Observable, map } from 'rxjs';
import { selectForgotPasswordError, selectForgotPasswordLoading, selectForgotPasswordMessage } from '../../store/user.selector';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit{
  form !: FormGroup
  message$ : Observable<string> | string 
  loading$ : Observable<string> | string 
  error$ : Observable<string> | string 

  constructor( 
    readonly formBuilder : FormBuilder,
    private store : Store
    ){
      this.message$ = this.store.pipe(
        select(selectForgotPasswordMessage),
        map((doc: any) => (this.message$ = doc, this.error$ = ''))
      );
      this.message$?.subscribe((doc: string) => doc);

      this.error$ = this.store.pipe(
        select(selectForgotPasswordError),
        map((doc: any) => (this.error$ = doc, this.message$ = ''))
      );
      this.error$?.subscribe((doc: string) => doc);

      this.loading$ = this.store.pipe(
        select(selectForgotPasswordLoading),
        map((doc: any) => (this.loading$ = doc))
      );
      this.loading$?.subscribe((doc: string) => doc);
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : ['', [Validators.email, Validators.required]]
    })
  }

  submit(){
    const data = this.form.getRawValue()
    if(this.form.valid){
      this.store.dispatch(forgotEmailUser(data))
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
