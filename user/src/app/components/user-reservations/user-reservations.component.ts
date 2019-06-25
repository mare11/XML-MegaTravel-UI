import { Component, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ReservationCloud } from 'src/app/models/ReservationCloud';
import { SnackBar } from 'src/app/utils';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent {

  @Input() public reservations: any;
  @Input() public username: string;

  constructor(private reservationService: ReservationService, private snackBar: SnackBar) { }

  pushReview(reservationToReview: any) {
    const reviewingReservation = new ReservationCloud(reservationToReview.id, reservationToReview.accommodation.id, this.username,
      reservationToReview.reservationRating.rating, reservationToReview.reservationRating.comment, null, null);

    this.reservationService.addRating(reviewingReservation).subscribe(
      (reservationRating: any) => {
        this.reservations.forEach((reservation, index) => {
          if (reservation.id === reservationToReview.id) {
            reservation.reservationRating.exists = true;
            reservation.reservationRating.timestamp = reservationRating.timestamp;
            reservation.reservationRating.published = reservationRating.published;
            this.reservations[index] = reservation;
            return;
          }
        });

        this.snackBar.showSnackBar('You have reviewed your reservation successfully!');
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
      }
    );
  }

  removeReservation(reservationId: number) {
    this.reservations = this.reservations.filter((reservation: any) => reservation.id !== reservationId);
  }
}
