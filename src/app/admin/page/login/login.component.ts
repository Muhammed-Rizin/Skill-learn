import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { adminLogin } from '../../store/admin.actions';
import { Observable, map } from 'rxjs';
import { selectError, selectLoading } from '../../store/admin.selector';

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
      map((doc: any) => (this.error$ = doc))
    );
    this.error$?.subscribe((doc) => doc)

    this.loading$ = this.store.pipe(
      select(selectLoading),
      map((doc: any) => (this.loading$ = doc))
    );
    this.loading$?.subscribe((doc: boolean) => doc);
  }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        email : ['', [Validators.required, Validators.email]],
        password : ['', [Validators.required]]
      })
  }
  submit(){
    const data = this.form.getRawValue()
    if(this.form.valid){
      this.store.dispatch(adminLogin(data))
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
