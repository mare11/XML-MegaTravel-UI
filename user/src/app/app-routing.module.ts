import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccommodationsComponent } from './components/accommodations/accommodations.component';
import { VerifyUserComponent } from './components/verify-user/verify-user.component';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './components/registration-dialog/registration-dialog.component';
import { ReservationDialogComponent } from './components/reservation-dialog/reservation-dialog.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserReservationsComponent } from './components/user-reservations/user-reservations.component';
import { UserSingleReservationComponent } from './components/user-single-reservation/user-single-reservation.component';
import { UserMessagesComponent } from './components/user-messages/user-messages.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AccommodationDetailsComponent } from './components/accommodation-details/accommodation-details.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'accommodations', component: AccommodationsComponent },
  { path: 'accommodations/:id', component: AccommodationDetailsComponent },
  { path: 'registration/verify', component: VerifyUserComponent },
  { path: 'users/profile', component: UserProfileComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [AccommodationsComponent,
  VerifyUserComponent,
  LoginDialogComponent,
  RegistrationDialogComponent,
  ReservationDialogComponent,
  UserProfileComponent,
  UserReservationsComponent,
  UserSingleReservationComponent,
  UserInfoComponent,
  UserMessagesComponent,
  HomepageComponent,
  AccommodationDetailsComponent];
