import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { ScheduledComponent } from './page/scheduled/scheduled.component';
import { ScheduledCompletedComponent } from './page/scheduled-completed/scheduled-completed.component';
import { ScheduledNewComponent } from './page/scheduled-new/scheduled-new.component';
import { VideoComponent } from './page/video/video.component';
import { ProfessionalAuthenticationGuard } from '../guard/professional/professional-authentication.guard';
import { ProfessionalGuard } from '../guard/professional/professional.guard';
import { ConsecutiveGuard } from '../guard/professional/professional-consecutive.guard';
import { ProfessionalBlockedGuard } from '../guard/professional/professional-blocked.guard';
import { ProfessionalApprovedGuard } from '../guard/professional/professional-approved.guard';
import { ProfessionalChatGuard } from '../guard/professional/professional-chat.guard';
import { PaymentListComponent } from './page/payment-list/payment-list.component';
import { ServerErrorComponent } from '../error/server-error/server-error.component';
import { ServerErrorGuard } from '../guard/server-error.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ConsecutiveGuard, ProfessionalGuard],
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [ConsecutiveGuard, ProfessionalGuard],
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    canActivate: [ConsecutiveGuard, ProfessionalGuard],
  },
  {
    path: 'newpassword',
    component: NewPasswordComponent,
    canActivate: [ConsecutiveGuard, ProfessionalGuard],
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
    ],
  },
  {
    path: 'verifyemail',
    component: VerifyEmailComponent,
    canActivate: [ConsecutiveGuard],
  },

  {
    path: '',
    component: HomeComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
      ProfessionalChatGuard,
    ],
  },
  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },

  {
    path: 'tasks',
    component: TaskComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },
  {
    path: 'tasks/completed',
    component: TaskCompletedComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },
  {
    path: 'tasks/new',
    component: TaskNewComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },

  {
    path: 'schedule',
    component: ScheduledComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },
  {
    path: 'schedule/completed',
    component: ScheduledCompletedComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },
  {
    path: 'schedule/new',
    component: ScheduledNewComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },

  {
    path: 'video/:id',
    component: VideoComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },

  {
    path: 'payment',
    component: PaymentListComponent,
    canActivate: [
      ConsecutiveGuard,
      ProfessionalAuthenticationGuard,
      ProfessionalBlockedGuard,
      ProfessionalApprovedGuard,
    ],
  },
  {
    path: 'server-error',
    component: ServerErrorComponent,
    canActivate: [ServerErrorGuard],
  },
  { path: '**', pathMatch: 'full', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfessionalRoutingModule {}
