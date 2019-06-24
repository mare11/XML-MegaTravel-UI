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
import { HomepageComponent } from './components/homepage/homepage.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    UserSingleReservationComponent,
    ReservationsFilterPipe,
    UserInfoComponent,
    HomepageComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
