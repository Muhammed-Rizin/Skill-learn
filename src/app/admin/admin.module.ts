import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';

import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SideBarComponent } from './page/side-bar/side-bar.component';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfessionalRequestsComponent } from './page/professional-requests/professional-requests.component';
import { UsersComponent } from './page/users/users.component';
import { AdminGuard, ConsecutiveGuard, adminBackGuard } from '../guard/admin-guard.guard';
import { ErrorPageComponent } from '../error/error-page/error-page.component';

const routes : Routes = [
  {path : '', component : LoginComponent, canActivate : [ConsecutiveGuard, adminBackGuard]},
  {path : 'dashboard', component : DashboardComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
  {path : 'professionals/request', component : ProfessionalRequestsComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
  {path : 'professionals', component : ProfessionalsComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
  {path : 'users', component : UsersComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
  {path : '**', pathMatch : 'full', component : ErrorPageComponent}
]

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    SideBarComponent,
    ProfessionalsComponent,
    ProfessionalRequestsComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  exports : [RouterModule]
})
export class AdminModule { }
