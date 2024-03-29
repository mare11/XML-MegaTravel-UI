import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/models/reservation/reservation';
import { Message } from 'src/app/models/message/message';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  createReservation(reservation: Reservation) {
    return this.http.post('/api/reservation-service/reservations', reservation);
  }

  getUserReservations(userId: number, username: string) {
    return this.http.get('/api/reservation-service/reservations/' + userId + '/users/' + username);
  }

  addMessage(reservationId: number, message: Message) {
    return this.http.put('/api/reservation-service/reservations/' + reservationId + '/message', message);
  }

  addRating(reservationToReview: any) {
    return this.http.post('/api/reservation-service/reservations/rating', reservationToReview);
  }

  cancelReservation(reservationId: number) {
    return this.http.delete('/api/reservation-service/reservations/' + reservationId);
  }

}
