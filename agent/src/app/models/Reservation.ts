import { ReservationRating } from './ReservationRating';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

export class Reservation {
    id: number;
    accommodationId: number;
    userId: number;
    startDate: Date;
    endDate: Date;
    realized: boolean;
    reservationRating: ReservationRating;
    message: Message[];

    constructor(id, accommodationId, userId, startDate, endDate, realized, rating, message) {
        this.id = id;
        this.accommodationId = accommodationId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.realized = realized;
        this.reservationRating = rating;
        this.message = message;
    }
}
