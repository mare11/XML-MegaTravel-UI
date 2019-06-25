import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Message } from 'src/app/models/Message';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { SnackBar } from 'src/app/utils';
import { DirectionEnum } from 'src/app/models/DirectionEnum';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-reservations-and-messages',
  templateUrl: './reservations-and-messages.component.html',
  styleUrls: ['./reservations-and-messages.component.css']
})
export class ReservationsAndMessagesComponent implements OnInit {

  @Input() public accommodationId: any;
  @Input() public username: any;
  private reservations: any = new Array<Reservation>();
  private messages = new Array<Message>();
  private newMessage = '';
  private selectedReservationId;
  private selectedReservationState;

  constructor(private reservationServce: ReservationService,
    private snackBar: SnackBar) { }

  ngOnInit() {
    // this.reservationServce.getAccommodationReservations(this.accommodationId).subscribe(
    //   (reservations) => {
    //     this.reservations = reservations;
    //     this.messages = this.reservations[0].message;
    //     this.selectedReservationId = this.reservations[0].id;
    //   }
    // );
    const message1 = new Message('Cao useru he he', new Date('2019-04-11T10:20:30Z'), DirectionEnum.AGENT_TO_USER);
    const message2 = new Message('Cao agente smaracu', new Date('2019-04-11T10:25:12Z'), DirectionEnum.USER_TO_AGENT);
    const message3 = new Message('Oooooooooooo agente konjino', new Date('2019-05-10T10:25:12Z'), DirectionEnum.USER_TO_AGENT);
    const messages1 = new Array<Message>();
    messages1.push(message1);
    messages1.push(message2);
    const messages2 = new Array<Message>();
    messages2.push(message3);
    const reservation1 = new Reservation(1, this.accommodationId, 10, new Date('2019-07-11'),
      new Date('2019-07-19'), false, null, messages1, 2, 30);
    const reservation2 = new Reservation(2, this.accommodationId, 10, new Date('2019-05-15'),
      new Date('2019-05-22'), true, null, messages2, 0, 40);
    this.reservations.push(reservation1);
    this.reservations.push(reservation2);

    this.messages = this.reservations[0].message;
    this.selectedReservationId = this.reservations[0].id;
    this.selectedReservationState = this.reservations[0].state;
  }

  sendMessage(reservationId: number) {
    if (this.newMessage.length === 0) {
      return;
    }
    const message = new Message(this.newMessage, null, DirectionEnum.AGENT_TO_USER);
    this.messages.push(message);
    this.newMessage = '';
    // this.reservationServce.addReservationMessage(reservationId, message).subscribe(
    //   (sentMessage: Message) => {
    //     // this.snackBar.showSnackBar('Message is sent successfully!');
    //     this.messages.push(sentMessage);
    //     this.newMessage = '';
    //   },
    //   (error) => {
    //     this.snackBar.showSnackBar(error.error.message);
    //   }
    // );
  }

  realizeReservation(reservationId: number) {
    this.reservations.forEach((reservation, index) => {
      if (reservation.id === reservationId) {
        reservation.realized = true;
        this.reservations[index] = reservation;
        this.snackBar.showSnackBar('You have confirmed reservation realization successfully!');
        return;
      }
    });
  }
}
