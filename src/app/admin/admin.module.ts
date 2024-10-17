import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';

import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { SideBarComponent } from './page/side-bar/side-bar.component';
import { ProfessionalsComponent } from './page/professionals/professionals.component';
import { ProfessionalRequestsComponent } from './page/professional-requests/professional-requests.component';
import { UsersComponent } from './page/users/users.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    AdminRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  exports: [RouterModule],
})
export class AdminModule {}
