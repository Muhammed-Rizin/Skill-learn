import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loginUser } from '../../store/user.action';
import { Observable, map } from 'rxjs';
import { selectError, selectLoading, selectUserData } from '../../store/user.selector';
import { Router } from '@angular/router';
import { userData } from '../../types/user.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form !: FormGroup
  
  error$ : Observable<String> | string
  data$ : Observable<userData> | string
  constructor (
    readonly formBuilder : FormBuilder, private store : Store,private router : Router
  ){
    this.error$ = this.store.pipe(
      select(selectError),
      map((doc: any) => (this.error$ = doc))
    );
    this.error$?.subscribe((doc) => doc)

    this.data$ = this.store.pipe(
      select(selectUserData),
      map((doc: any) => (this.data$ = doc))
    );
    this.data$?.subscribe((doc: userData) => doc);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
    email : ['', [Validators.email, Validators.required]],
    password : ['', [Validators.required ,Validators.minLength(8)]]
  })
  }

  submit(){
    const data = this.form.getRawValue()
    if(this.form.valid){
      this.store.dispatch(loginUser(data))
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
