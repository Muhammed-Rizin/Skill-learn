import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfessionalRequestsComponent } from './page/professional-requests/professional-requests.component';
import { UsersComponent } from './page/users/users.component';
import { AdminGuard, ConsecutiveGuard, adminBackGuard } from '../guard/admin-guard.guard';
import { ErrorPageComponent } from '../error/error-page/error-page.component';

const routes: Routes = [
    {path : '', component : LoginComponent, canActivate : [ConsecutiveGuard, adminBackGuard]},
    {path : 'dashboard', component : DashboardComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
    {path : 'professionals/request', component : ProfessionalRequestsComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
    {path : 'professionals', component : ProfessionalsComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
    {path : 'users', component : UsersComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
    {path : '**', pathMatch : 'full', component : ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
