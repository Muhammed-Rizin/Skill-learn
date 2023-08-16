import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfessionalRequestsComponent } from './page/professional-requests/professional-requests.component';
import { UsersComponent } from './page/users/users.component';
import { ErrorPageComponent } from '../error/error-page/error-page.component';
import { ConsecutiveGuard } from '../guard/admin/admin-consecutive.guard';
import { AdminGuard } from '../guard/admin/admin.guard';
import { AdminAuthentication } from '../guard/admin/admin-authentication.guard';
import { ServerErrorComponent } from '../error/server-error/server-error.component';
import { ServerErrorguard } from '../guard/server-error.guard';

const routes: Routes = [
    {path : '', component : LoginComponent, canActivate : [ConsecutiveGuard, AdminGuard]},
    {path : 'dashboard', component : DashboardComponent, canActivate : [ConsecutiveGuard, AdminAuthentication]},

    {path : 'users', component : UsersComponent, canActivate : [ConsecutiveGuard, AdminAuthentication]},
    {path : 'professionals', component : ProfessionalsComponent, canActivate : [ConsecutiveGuard, AdminAuthentication]},
    {path : 'professionals/request', component : ProfessionalRequestsComponent, canActivate : [ConsecutiveGuard, AdminAuthentication]},

    {path : 'server-error', component : ServerErrorComponent, canActivate: [ServerErrorguard]},
    {path : '**', pathMatch : 'full', component : ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
