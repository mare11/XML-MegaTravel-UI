import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SnackBar, ReservationState } from 'src/app/utils';
import { DirectionEnum } from 'src/app/models/DirectionEnum';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-reservations-and-messages',
  templateUrl: './reservations-and-messages.component.html',
  styleUrls: ['./reservations-and-messages.component.css']
})
export class ReservationsAndMessagesComponent implements OnInit, OnChanges {

  @Input() public accommodationId: any;
  @Input() public username: any;
  private reservations: any = new Array<Reservation>();
  private messages = new Array<Message>();
  private newMessage = '';
  private selectedReservationId;
  private selectedReservationState;

  constructor(
    private reservationService: ReservationService,
    private snackBar: SnackBar) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.reservationService.getAccommodationReservations(this.accommodationId).subscribe(
      (reservations) => {
        this.reservations = reservations;
        if (this.reservations.length > 0) {
          this.messages = this.reservations[0].message;
          this.selectedReservationId = this.reservations[0].id;
          this.selectedReservationState = this.reservations[0].state;
        }

        this.reservations.forEach(reservation => {
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
        }
        );
      });
  }

  sendMessage(reservationId: number) {
    if (this.newMessage.length === 0) {
      return;
    }
    const message = new Message(this.newMessage, new Date(), DirectionEnum.AGENT_TO_USER);
    this.reservationService.addReservationMessage(reservationId, message).subscribe(
      (sentMessage: Message) => {
        this.snackBar.showSnackBar('Message is sent successfully!');
        this.messages.push(sentMessage);
        this.newMessage = '';
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again.');
      }
    );
  }

  realizeReservation(reservationId: number) {
    this.reservationService.setReservationRealized(reservationId).subscribe(
      () => {
        this.reservations.forEach((reservation, index) => {
          if (reservation.id === reservationId) {
            reservation.realized = true;
            this.reservations[index] = reservation;
            this.snackBar.showSnackBar('You have confirmed reservation realization successfully!');
            return;
          }
        });
      },
      () => {
        this.snackBar.showSnackBar('An error occurred. Try again.');
      }
    );
  }
}
