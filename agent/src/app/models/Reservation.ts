import { ReservationRating } from './ReservationRating';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ReservationState } from '../utils';

export class Reservation {
    id: number;
    accommodationId: number;
    userId: number;
    startDate: Date;
    endDate: Date;
    realized: boolean;
    reservationRating: ReservationRating;
    message: Message[];
    state: ReservationState;
    price: number;

    constructor(id, accommodationId, userId, startDate, endDate, realized, rating, message, state, price) {
        this.id = id;
        this.accommodationId = accommodationId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.realized = realized;
        this.reservationRating = rating;
        this.message = message;
        this.state = state;
        this.price = price;
    }
}
