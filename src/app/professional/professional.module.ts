import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';


import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ErrorPageComponent } from '../error/error-page/error-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ChatComponent } from './page/chat/chat.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { ProfessionalRoutingModule } from './professional-routing.module';
import { TaskComponent } from './page/task/task.component';
import { TaskCompletedComponent } from './page/task-completed/task-completed.component';
import { TaskNewComponent } from './page/task-new/task-new.component';

const route : Routes = [
  
]

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    ProfileComponent,
    ChatComponent,
    VerifyEmailComponent,
    TaskComponent,
    TaskCompletedComponent,
    TaskNewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ProfessionalRoutingModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  exports : [RouterModule]
})
export class ProfessionalModule { }
