import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/app.state';
import { AuthEffects } from './features/auth/auth-store/effects';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    HttpClientModule, RouterModule,
    EffectsModule.forRoot([AuthEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production
    }),

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
