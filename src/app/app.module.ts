import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { initializeApp } from 'firebase/app';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProfessionalModule } from './professional/professional.module';
import { ProfessionalDataReducer, completedSchedule, completedTask, forgetpasswordReducer, getUserDetailsByTokenReducer, inprogressSchedule, inprogressTask, loginReducer, newPasswordReducer, professionalsList, registerReducer } from './user/store/user.reducer';
import { UserEffects } from './user/store/user.effect';
import { adminLoginReducer, loadRequestedProfessionalsReducer, loadProfessionalsReducer, loadUsersReducer, loadTotalUserReducer, loadTotalProfessionalsReducer, loadTotalRequestProfessionalReducer } from './admin/store/admin.reducer';
import { adminEffects } from './admin/store/admin.effects';
import { UserService } from './services/user/user.service';
import { ProfessionalService } from './services/professional/professional.service';
import { AdminService } from './services/admin/admin.service';
import { getProfessionalDetailsReducer, getcompletedSchedule, getcompletedTask, getinprogressSchedule, getinprogressTask, professionalForgetpasswordReducer, professionalLoginReducer, professionalNewPasswordReducer, professionalRegisterReducer } from './professional/store/professional.reducer';
import { professionalEffects } from './professional/store/professional.effects';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environment/environment';
import { NotificationService } from './services/notification/notification.service';
import { ServerErrorComponent } from './error/server-error/server-error.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ServerErrorComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    AdminModule,
    HttpClientModule,
    ProfessionalModule,
    StoreModule.forRoot({
      loginUserState : loginReducer, 
      registerUserState : registerReducer, 
      loginAdminState : adminLoginReducer,
      registerProfessionalState : professionalRegisterReducer,
      loginProfessionalState : professionalLoginReducer,
      loadTotalUserState : loadTotalUserReducer,
      loadTotalProfessionals : loadTotalProfessionalsReducer,
      loadTotalRequestedProfessionals : loadTotalRequestProfessionalReducer,
      loadUsersState : loadUsersReducer,
      loadProfessionalState : loadProfessionalsReducer,
      loadRequestProfessionalState : loadRequestedProfessionalsReducer,
      userForgetPasswordState : forgetpasswordReducer,
      userDetailsState : getUserDetailsByTokenReducer,
      newPasswordState : newPasswordReducer,
      professionalForgotPasswordState : professionalForgetpasswordReducer,
      professionlaDetailsState : getProfessionalDetailsReducer,
      professionalnewPasswordState : professionalNewPasswordReducer,
      getProfessionalDataReducerInUser : ProfessionalDataReducer,
      professionalListReducer : professionalsList,
      
      userInprogressTask : inprogressTask,
      usercompletedTask : completedTask,
      userInprogressSchedule : inprogressSchedule,
      userCompletedSchedule : completedSchedule,

      professionalInprogressTask : getinprogressTask,
      professionalCompletedTask : getcompletedTask,
      professionalInprogressSchedule : getinprogressSchedule,
      professionalCompletedSchedule : getcompletedSchedule,
    }),
    EffectsModule.forRoot([UserEffects, adminEffects, professionalEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule,
    MatMenuModule,
    NgbModule,
    MatProgressBarModule
  ],
  providers: [UserService, ProfessionalService, AdminService, NotificationService, {
    provide:HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    initializeApp(environment.firebase);
  }
 }
