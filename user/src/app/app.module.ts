import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { SnackBar } from './utils';

@NgModule({
  declarations: [
    AppComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
    VerifyUserComponent
  ],
  entryComponents: [
    LoginDialogComponent,
    RegistrationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SnackBar
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
