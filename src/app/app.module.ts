import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import Amplify from 'aws-amplify';
import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { AmplifyUIAngularModule } from '@aws-amplify/ui-angular';

Amplify.configure({
  Auth: {
    identityPoolId: environment.COGNITO_IDENTITY_POOL_ID,
    region: environment.AWS_REGION,
    userPoolId: environment.COGNITO_USER_POOL_ID,
    userPoolWebClientId: environment.COGNITO_USER_POOL_CLIENT_ID
  }
});
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    AmplifyUIAngularModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
