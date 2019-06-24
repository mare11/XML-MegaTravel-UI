export class ReservationRating {
    rating: number;
    comment: string;
    dateTime: Date;
    published: boolean;

    constructor(rating, comment, dateTime, published) {
        this.rating = rating;
        this.comment = comment;
        this.dateTime = dateTime;
        this.published = published;
    }
}
