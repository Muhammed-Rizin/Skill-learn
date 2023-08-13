import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { professionalData } from '../../types/professional.types';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectLoginError, selectLoginLoading, selectLoginUserData } from '../../store/professional.selector';
import { professionalLogin } from '../../store/professional.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form !: FormGroup
  
  error$ : Observable<String> | string
  loading$: Observable<boolean> | boolean;
  constructor (
    readonly formBuilder : FormBuilder, private store : Store
  ){
    this.error$ = this.store.pipe(
      select(selectLoginError),
      map((doc: string) => (this.error$ = doc))
    );
    this.error$?.subscribe((doc) => doc)

    this.loading$ = this.store.pipe(
      select(selectLoginLoading),
      map((doc: boolean) => (this.loading$ = doc))
    );
    this.loading$?.subscribe((doc: boolean) => doc);
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
      this.store.dispatch(professionalLogin({professionalData : data}))
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
