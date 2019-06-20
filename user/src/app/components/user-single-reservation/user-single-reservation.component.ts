import { Component, OnInit, Input } from '@angular/core';
import { Reservation } from 'src/app/models/reservation/reservation';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SnackBar, DirectionEnum } from 'src/app/utils';
import { Message } from 'src/app/models/message/message';
import { UserReservationsComponent } from '../user-reservations/user-reservations.component';

@Component({
  selector: 'app-user-single-reservation',
  templateUrl: './user-single-reservation.component.html',
  styleUrls: ['./user-single-reservation.component.css']
})
export class UserSingleReservationComponent implements OnInit {

  @Input() public reservation: any;
  private array: ArrayConstructor;
  private message: string;

  constructor(private reservationServce: ReservationService,
              private snackBar: SnackBar,
              private userReservationsComponent: UserReservationsComponent) { }

  ngOnInit() {
    this.array = Array;
    this.message = '';
  }

  sendMessage(reservation: any) {
    const timestamp = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(),
                                new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), new Date().getMilliseconds()));
    const message = new Message(this.message, timestamp, DirectionEnum.USER_TO_AGENT);
    this.reservationServce.addMessage(reservation.id, message).subscribe(
      () => {
        this.snackBar.showSnackBar('Message is sent successfully!');
        this.message = '';
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
      }
    );
  }

  cancelReservation(reservation: any) {
    this.reservationServce.cancelReservation(reservation.id).subscribe(
      () => {
        this.snackBar.showSnackBar('Reservation is canceled successfully!');
        this.userReservationsComponent.removeReservation(reservation.id);
      },
      (error) => {
        this.snackBar.showSnackBar(error.error.message);
      }
    );
  }
}
