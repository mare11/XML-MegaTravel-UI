import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from 'src/app/models/Message';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  getAccommodationReservations(id: number) {
    return this.http.get('/api/reservation/' + id);
  }

  addReservationMessage(id: number, message: Message) {
    return this.http.post('/api/reservation/' + id, message);
  }

  setReservationRealized(id: number) {
    return this.http.put('/api/reservation/' + id, null);
  }

}
