import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth-store/effects';
import { AuthReducer } from './auth-store/reducer';
import { AUTH_STATE_NAME } from './auth-store/selectors';
import { AuthRoutingModule } from './auth-routing.module';
@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    EffectsModule.forFeature(),

  ],
  exports: [AuthRoutingModule, LoginComponent],
})
export class AuthModule { }
