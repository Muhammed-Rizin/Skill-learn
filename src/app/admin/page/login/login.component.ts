import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { adminLoginAction } from '../../store/admin.actions';
import { Observable, map } from 'rxjs';
import { selectError, selectLoading } from '../../store/admin.selector';
import { adminLogin } from '../../types/admin.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  form !: FormGroup
  error$ !: Observable<string> | string
  loading$ : Observable<boolean> | boolean

  constructor(
    private formBuilder : FormBuilder, 
    private store : Store
  ){
    this.error$ = this.store.pipe(
      select(selectError),
      map((doc: string) => (this.error$ = doc))
    );
    this.error$?.subscribe((doc) => doc)

    this.loading$ = this.store.pipe(
      select(selectLoading),
      map((doc: boolean) => (this.loading$ = doc))
    );
    this.loading$?.subscribe((doc) => doc);
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required]]
      })
  }
  submit(){
    const data: adminLogin = this.form.getRawValue()
    if(this.form.valid){
      this.store.dispatch(adminLoginAction({formData: data}))
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
