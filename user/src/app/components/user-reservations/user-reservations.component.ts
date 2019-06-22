import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Reservation } from 'src/app/models/reservation/reservation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AccommodationService } from 'src/app/services/accommodation/accommodation.service';
import { ReservationState } from 'src/app/utils';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent implements OnInit {

  private reservations: Array<any> = new Array();
  private dataLoaded = false;

  constructor(private reservationService: ReservationService,
              private authenticationService: AuthenticationService,
              private accommodationService: AccommodationService) {
  }

  ngOnInit() {
    const userId = this.authenticationService.getId();
    if (userId) {
      this.reservationService.getUserReservations(userId).subscribe(
        (reservations: Array<Reservation>) => {
          this.reservations = reservations;
          this.reservations.forEach((reservation, index) => {

            // Check in which state reservation is
            const currentDate = new Date();
            const startDate = new Date(reservation.startDate);
            const endDate = new Date(reservation.endDate);
            if (startDate.getTime() <= currentDate.getTime() && endDate.getTime() <= currentDate.getTime()) {
              reservation.state = ReservationState.PASSED;
            } else if (startDate.getTime() <= currentDate.getTime() && endDate.getTime() > currentDate.getTime()) {
              reservation.state = ReservationState.IN_PROGRESS;
            } else {
              reservation.state = ReservationState.ACTIVE;
            }

            // Check if reservation can be canceled or not
            const cancellationExpiringDate = new Date(startDate);
            cancellationExpiringDate.setDate(cancellationExpiringDate.getDate() - reservation.accommodation.cancellationDays);
            if (reservation.accommodation.freeCancellation &&
                reservation.state === ReservationState.ACTIVE &&
                currentDate.getTime() <= cancellationExpiringDate.getTime()) {
              reservation.canCancel = true;
            } else {
              reservation.canCancel = false;
            }

            this.reservations[index] = reservation;
          });

          this.dataLoaded = true;
        }
      );
    }
  }

  removeReservation(reservationId: number) {
    this.reservations = this.reservations.filter((reservation: any) => reservation.id !== reservationId);
  }
}
