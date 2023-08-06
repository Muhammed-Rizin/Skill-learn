import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';

import { ConsecutiveGuard, HomeGuard, UserBackGuard, UserBlockedGuard, UserGuard } from '../guard/user-guard.guard';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ForgetpasswordComponent } from './page/forgetpassword/forgetpassword.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ErrorPageComponent } from '../error/error-page/error-page.component';
import { ChatComponent } from './page/chat/chat.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { ProfessionalProfileComponent } from './page/professional-profile/professional-profile.component';
import { OrderSuccessComponent } from './page/order-success/order-success.component';
import { TaskCompletedComponent } from './page/task-completed/task-completed.component';
import { TaskComponent } from './page/task/task.component';
import { ScheduledComponent } from './page/scheduled/scheduled.component';
import { ScheduledCompletedComponent } from './page/scheduled-completed/scheduled-completed.component';


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
  {path : 'tasks', component : TaskComponent, canActivate : [UserGuard, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'tasks/completed', component : TaskCompletedComponent, canActivate : [UserGuard, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'schedule', component : ScheduledComponent, canActivate : [UserGuard, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'schedule/completed', component : ScheduledCompletedComponent, canActivate : [UserGuard, ConsecutiveGuard, UserBlockedGuard]},
  {path : '**', pathMatch : 'full', component : ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
