import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SnackBar } from './utils';
import { ReservationsFilterPipe } from './pipes/reservations-filter/reservations-filter.pipe';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { AccommodationDetailsComponent } from './components/accommodation-details/accommodation-details.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ReservationsFilterPipe,
    AccommodationDetailsComponent
  ],
  entryComponents: [
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SnackBar
  ],
  providers: [UserReservationsComponent, UserMessagesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
