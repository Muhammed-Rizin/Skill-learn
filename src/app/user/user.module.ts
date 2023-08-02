import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsecutiveGuard, HomeGuard, UserBackGuard, UserBlockedGuard, UserGuard } from '../guard/user-guard.guard';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ForgetpasswordComponent } from './page/forgetpassword/forgetpassword.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ErrorPageComponent } from '../error/error-page/error-page.component';
import { ChatComponent } from './page/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { ProfessionalProfileComponent } from './page/professional-profile/professional-profile.component';
import { OrderSuccessComponent } from './page/order-success/order-success.component';
const routes: Routes = [
  {path : '' , component : HomeComponent, canActivate : [ConsecutiveGuard, HomeGuard]},
  {path : 'home' , component : HomeComponent, canActivate : [ConsecutiveGuard]},
  {path : 'login' , component : LoginComponent, canActivate : [UserBackGuard, ConsecutiveGuard]},
  {path : 'sign_up', component : SignUpComponent, canActivate: [UserBackGuard, ConsecutiveGuard]},
  {path : 'explore', component : ProfessionalsComponent, canActivate : [ConsecutiveGuard ]},
  {path : 'profile', component : ProfileComponent, canActivate : [ConsecutiveGuard, UserGuard, UserBlockedGuard]},
  {path : 'forgotpassword', component : ForgetpasswordComponent, canActivate : [UserBackGuard, ConsecutiveGuard]},
  {path : 'newpassword', component : NewPasswordComponent, canActivate : [UserBackGuard, ConsecutiveGuard]},
  {path : 'chat', component : ChatComponent, canActivate : [UserGuard, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'chat/:id', component : ChatComponent, canActivate : [UserGuard, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'verifyemail', component : VerifyEmailComponent, canActivate : [UserGuard, ConsecutiveGuard,UserBlockedGuard]},
  {path : 'viewprofile/:id', component : ProfessionalProfileComponent, canActivate : [UserGuard,UserBlockedGuard, ConsecutiveGuard]},
  {path : 'ordersuccess', component : OrderSuccessComponent, canActivate : [UserGuard,UserBlockedGuard, ConsecutiveGuard]},
  {path : '**', pathMatch : 'full', component : ErrorPageComponent}
];

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
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports : [RouterModule]
})
export class UserModule { }
