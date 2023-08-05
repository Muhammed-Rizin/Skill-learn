import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ForgetpasswordComponent } from './page/forgetpassword/forgetpassword.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ChatComponent } from './page/chat/chat.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { ProfessionalProfileComponent } from './page/professional-profile/professional-profile.component';
import { OrderSuccessComponent } from './page/order-success/order-success.component';
import { UserRoutingModule } from './user-routing.module';
import { ProfessionalsSearchPipe } from '../pipe/professionals-search.pipe';
import { TaskComponent } from './page/task/task.component';
import { TaskCompletedComponent } from './page/task-completed/task-completed.component';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SignUpComponent,
    ProfessionalsComponent,
    ProfileComponent,
    ForgetpasswordComponent,
    NewPasswordComponent,
    ChatComponent,
    VerifyEmailComponent,
    ProfessionalProfileComponent,
    OrderSuccessComponent,
    ProfessionalsSearchPipe,
    TaskComponent,
    TaskCompletedComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [RouterModule]
})
export class UserModule { }
