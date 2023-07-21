import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { NavBarComponent } from './page/nav-bar/nav-bar.component';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsecutiveGuard, HomeGuard, UserBackGuard, UserGuard } from '../guard/user-guard.guard';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfileComponent } from './page/profile/profile.component';
const routes: Routes = [
  {path : '' , component : HomeComponent, canActivate : [ConsecutiveGuard, HomeGuard]},
  {path : 'home' , component : HomeComponent, canActivate : [ConsecutiveGuard]},
  {path : 'login' , component : LoginComponent, canActivate : [UserBackGuard, ConsecutiveGuard]},
  {path : 'sign_up', component : SignUpComponent, canActivate: [UserBackGuard, ConsecutiveGuard]},
  {path : 'explore', component : ProfessionalsComponent, canActivate : [ConsecutiveGuard]},
  {path : 'profile', component : ProfileComponent, canActivate : [ConsecutiveGuard, UserGuard]}
];

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    NavBarComponent,
    SignUpComponent,
    ProfessionalsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  exports : [RouterModule]
})
export class UserModule { }
