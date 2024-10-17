import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { loginUserAction } from '../../store/user.action';
import { Observable, map } from 'rxjs';
import {
  selectError,
  selectLoading,
  selectUserData,
} from '../../store/user.selector';
import { Router } from '@angular/router';
import { loginUser, userData } from '../../types/user.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form!: FormGroup;

  error$: Observable<String> | string;
  loading$: Observable<boolean> | boolean;
  constructor(
    readonly formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
  ) {
    this.error$ = this.store.pipe(
      select(selectError),
      map((doc: string) => (this.error$ = doc)),
    );
    this.error$?.subscribe((doc) => doc);

    this.loading$ = this.store.pipe(
      select(selectLoading),
      map((doc: boolean) => (this.loading$ = doc)),
    );
    this.loading$?.subscribe((doc: boolean) => doc);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    const data: loginUser = this.form.getRawValue();
    if (this.form.valid) {
      this.store.dispatch(loginUserAction({ data }));
    } else {
      this.markFormControlsAsTouched(this.form);
    }
  }

  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
}
