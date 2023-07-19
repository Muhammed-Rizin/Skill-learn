import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { HomeComponent } from './page/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './page/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConsecutiveGuard, ProfessionalGuard, professionalBackGuard } from '../guard/professional-guard.guard';

const route : Routes = [
  {path : '', component : HomeComponent, canActivate :[ConsecutiveGuard, ProfessionalGuard]},
  {path : 'login', component : LoginComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
  {path : 'sign-up', component : SignUpComponent, canActivate : [ConsecutiveGuard, professionalBackGuard]},
]

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule
  ],
  exports : [RouterModule]
})
export class ProfessionalModule { }
