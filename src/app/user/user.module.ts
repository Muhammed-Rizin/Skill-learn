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
import { MatMenuModule } from '@angular/material/menu';
import { ScheduledCompletedComponent } from './page/scheduled-completed/scheduled-completed.component';
import { ScheduledComponent } from './page/scheduled/scheduled.component';
import { VideoComponent } from './page/video/video.component';
import { PaymentListComponent } from './page/payment-list/payment-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';

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
    TaskCompletedComponent,
    ScheduledCompletedComponent,
    ScheduledComponent,
    VideoComponent,
    PaymentListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatMenuModule,
    NgbModule,
    MatProgressBarModule,
    MatIconModule,
    MatBadgeModule
  ],
  exports : [RouterModule]
})
export class UserModule { }
