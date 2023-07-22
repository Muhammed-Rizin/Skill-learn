import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { ProfessionalModule } from './professional/professional.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { loginReducer, registerReducer } from './user/store/user.reducer';
import { UserEffects } from './user/store/user.effect';
import { HttpClientModule } from '@angular/common/http';
import { ConsecutiveGuard, UserBackGuard, RegisterGuard } from './guard/user-guard.guard';
import { adminLoginReducer, loadRequestedProfessionalsReducer, loadProfessionalsReducer, loadUsersReducer, loadTotalUserReducer, loadTotalProfessionalsReducer, loadTotalRequestProfessionalReducer } from './admin/store/admin.reducer';
import { adminEffects } from './admin/store/admin.effects';
import { UserService } from './services/user/user.service';
import { ProfessionalService } from './services/professional/professional.service';
import { AdminService } from './services/admin/admin.service';
import { professionalLoginReducer, professionalRegisterReducer } from './professional/store/professional.reducer';
import { professionalEffects } from './professional/store/professional.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
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
      loadRequestProfessionalState : loadRequestedProfessionalsReducer
    }),
    EffectsModule.forRoot([UserEffects, adminEffects, professionalEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ConsecutiveGuard, UserBackGuard, RegisterGuard, UserService, ProfessionalService, AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
