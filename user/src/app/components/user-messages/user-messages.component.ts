import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/models/message/message';
import { DirectionEnum, SnackBar } from 'src/app/utils';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnChanges {

  @Input() public reservations: any;
  @Input() public username: any;
  private messages = new Array<Message>();
  private newMessage = '';
  private selectedReservationId;

  constructor(private reservationServce: ReservationService,
              private snackBar: SnackBar) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reservations.length > 0) {
      this.messages = this.reservations[0].message;
      this.selectedReservationId = this.reservations[0].id;
    }
  }

  sendMessage(reservationId: number) {
    if (this.newMessage.length === 0) {
      return;
    }
    const message = new Message(this.newMessage, null, DirectionEnum.USER_TO_AGENT);
    this.reservationServce.addMessage(reservationId, message).subscribe(
      (sentMessage: Message) => {
        // this.snackBar.showSnackBar('Message is sent successfully!');
        this.messages.push(sentMessage);
        this.newMessage = '';
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
