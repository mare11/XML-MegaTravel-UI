import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccommodationDetailsComponent } from './components/accommodation-details/accommodation-details.component';
import { AccommodationDialogComponent } from './components/accommodation-dialog/accommodation-dialog.component';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { RatingsComponent } from './components/ratings/ratings.component';
import { ReservationsAndMessagesComponent } from './components/reservations-and-messages/reservations-and-messages.component';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { MaterialModule } from './material';
import { SnackBar } from './utils';
import { TokenInterceptor } from './http-interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    AccommodationsComponent,
    AccommodationDetailsComponent,
    AccommodationDialogComponent,
    UpdateDialogComponent,
    ReservationsAndMessagesComponent,
    RatingsComponent
  ],
  entryComponents: [
    AccommodationDialogComponent,
    UpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SnackBar
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
