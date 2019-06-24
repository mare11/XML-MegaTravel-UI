import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.css']
})
export class UserReservationsComponent {

  @Input() public reservations: any;

  removeReservation(reservationId: number) {
    this.reservations = this.reservations.filter((reservation: any) => reservation.id !== reservationId);
  }
}
