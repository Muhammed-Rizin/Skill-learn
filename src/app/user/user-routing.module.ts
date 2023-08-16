import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
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
import { VideoComponent } from './page/video/video.component';
import { ConsecutiveGuard } from '../guard/user/user-consecutive.guard';
import { HomeGuard } from '../guard/user/user-home.guard';
import { UserAvailable } from '../guard/user/user.guard';
import { UserAuthentication } from '../guard/user/user-authentication.guard';
import { UserBlockedGuard } from '../guard/user/user-blocked.guard';
import { PaymentListComponent } from './page/payment-list/payment-list.component';
import { ServerErrorComponent } from '../error/server-error/server-error.component';
import { ServerErrorguard } from '../guard/server-error.guard';


const routes: Routes = [
  {path : '' , component : HomeComponent, canActivate : [ConsecutiveGuard, HomeGuard]},
  {path : 'home' , component : HomeComponent, canActivate : [ConsecutiveGuard]},

  {path : 'login' , component : LoginComponent, canActivate : [UserAvailable, ConsecutiveGuard]},
  {path : 'sign_up', component : SignUpComponent, canActivate: [UserAvailable, ConsecutiveGuard]},

  {path : 'forgotpassword', component : ForgetpasswordComponent, canActivate : [UserAvailable, ConsecutiveGuard]},
  {path : 'newpassword', component : NewPasswordComponent, canActivate : [UserAvailable, ConsecutiveGuard]},
  
  {path : 'explore', component : ProfessionalsComponent, canActivate : [ConsecutiveGuard ]},
  {path : 'profile', component : ProfileComponent, canActivate : [ConsecutiveGuard, UserAuthentication, UserBlockedGuard]},
  {path : 'verifyemail', component : VerifyEmailComponent, canActivate : [UserAuthentication, ConsecutiveGuard,UserBlockedGuard]},
  {path : 'viewprofile/:id', component : ProfessionalProfileComponent, canActivate : [UserAuthentication,UserBlockedGuard, ConsecutiveGuard]},
  {path : 'ordersuccess', component : OrderSuccessComponent, canActivate : [UserAuthentication,UserBlockedGuard, ConsecutiveGuard]},

  {path : 'chat', component : ChatComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'chat/:id', component : ChatComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},

  {path : 'video/:id', component : VideoComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},

  {path : 'tasks', component : TaskComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'tasks/completed', component : TaskCompletedComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},

  {path : 'schedule', component : ScheduledComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},
  {path : 'schedule/completed', component : ScheduledCompletedComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},

  {path : 'payments', component : PaymentListComponent, canActivate : [UserAuthentication, ConsecutiveGuard, UserBlockedGuard]},

  {path : 'server-error', component : ServerErrorComponent, canActivate: [ServerErrorguard]},
  {path : '**', pathMatch : 'full', component : ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
