import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SnackBar } from './utils';
import { UserSingleReservationComponent } from './components/user-single-reservation/user-single-reservation.component';
import { ReservationsFilterPipe } from './pipes/reservations-filter/reservations-filter.pipe';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    ReservationsFilterPipe
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
