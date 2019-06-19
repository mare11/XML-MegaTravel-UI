import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { SnackBar } from './utils';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  entryComponents: [
    RoutingComponents,
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
