import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import {
  selectForgotPasswordError,
  selectForgotPasswordLoading,
  selectForgotPasswordMessage,
} from '../../store/professional.selector';
import { forgotEmailProfessional } from '../../store/professional.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  message$: Observable<string> | string;
  loading$: Observable<boolean> | boolean;
  error$: Observable<string> | string;

  constructor(
    readonly formBuilder: FormBuilder,
    private store: Store,
  ) {
    this.message$ = this.store.pipe(
      select(selectForgotPasswordMessage),
      map((doc: string) => ((this.message$ = doc), (this.error$ = ''))),
    );
    this.message$?.subscribe((doc: string) => doc);

    this.error$ = this.store.pipe(
      select(selectForgotPasswordError),
      map((doc: string) => ((this.error$ = doc), (this.message$ = ''))),
    );
    this.error$?.subscribe((doc: string) => doc);

    this.loading$ = this.store.pipe(
      select(selectForgotPasswordLoading),
      map((doc: boolean) => (this.loading$ = doc)),
    );
    this.loading$?.subscribe((doc: boolean) => doc);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  submit() {
    const data = this.form.getRawValue();
    if (this.form.valid) {
      this.store.dispatch(forgotEmailProfessional(data));
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
