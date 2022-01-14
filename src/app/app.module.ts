import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/auth-interceptor';
import { DialogLoginComponent } from './shared/components/dialog-login/dialog-login.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { DialogSingupComponent } from './shared/components/dialog-singup/dialog-singup.component';
import { DialogPasswordComponent } from './shared/components/dialog-password/dialog-password.component';

@NgModule({
  declarations: [
    AppComponent,
    DialogLoginComponent,
    DialogSingupComponent,
    DialogPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
