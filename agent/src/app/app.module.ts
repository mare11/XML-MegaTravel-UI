import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SnackBar } from './utils';
import { LoginComponent } from './components/login/login.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';
import { AccommodationDetailsComponent } from './components/accommodation-details/accommodation-details.component';
import { AccommodationDialogComponent } from './components/accommodation-dialog/accommodation-dialog.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    AccommodationsComponent,
    AccommodationDetailsComponent,
    AccommodationDialogComponent,
    UpdateDialogComponent
  ],
  entryComponents: [
    AccommodationDialogComponent,
    UpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SnackBar
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
