import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ConsecutiveGuard, ProfessionalApprovedGuard, ProfessionalBlockedGuard, ProfessionalGuard, ProfessionalchatGuard, professionalBackGuard } from '../guard/professional-guard.guard';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ErrorPageComponent } from '../error/error-page/error-page.component';
import { ProfileComponent } from './page/profile/profile.component';
import { ChatComponent } from './page/chat/chat.component';
import { VerifyEmailComponent } from './page/verify-email/verify-email.component';
import { TaskComponent } from './page/task/task.component';
import { TaskCompletedComponent } from './page/task-completed/task-completed.component';
import { TaskNewComponent } from './page/task-new/task-new.component';

const routes: Routes = [
    {path : 'login', component : LoginComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
    {path : 'sign-up', component : SignUpComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
    {path : 'forgotpassword', component : ForgotPasswordComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
    {path : 'newpassword', component : NewPasswordComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},

    {path : 'profile', component : ProfileComponent, canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard]},
    {path : 'verifyemail', component : VerifyEmailComponent, 
    canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard]},
    
    {path : '', component: HomeComponent, canActivate :[ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard, ProfessionalApprovedGuard, ProfessionalchatGuard]},
    {path : 'chat', component : ChatComponent, 
  canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard, ProfessionalApprovedGuard]},
    {path : 'chat/:id', component : ChatComponent, 
    canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard, ProfessionalApprovedGuard]},

    {path : 'tasks', component : TaskComponent, canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard, ProfessionalApprovedGuard]},
    {path : 'tasks/completed', component : TaskCompletedComponent, canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard, ProfessionalApprovedGuard]},
    {path : 'tasks/new', component : TaskNewComponent, canActivate : [ConsecutiveGuard, ProfessionalGuard, ProfessionalBlockedGuard, ProfessionalApprovedGuard]},

    {path : '**', pathMatch : 'full', component : ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalRoutingModule { }
