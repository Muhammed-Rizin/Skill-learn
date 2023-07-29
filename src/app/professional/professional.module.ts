import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsecutiveGuard, ProfessionalBlockedGuard, ProfessionalGuard, professionalBackGuard } from '../guard/professional-guard.guard';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './page/new-password/new-password.component';
import { ErrorPageComponent } from '../error/error-page/error-page.component';

const route : Routes = [
  {path : '', component : HomeComponent, canActivate :[ConsecutiveGuard, ProfessionalGuard]},
  {path : 'login', component : LoginComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
  {path : 'sign-up', component : SignUpComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
  {path : 'forgotpassword', component : ForgotPasswordComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
  {path : 'newpassword', component : NewPasswordComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
  {path : '**', pathMatch : 'full', component : ErrorPageComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SignUpComponent,
    NavBarComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ],
  exports : [RouterModule]
})
export class ProfessionalModule { }
