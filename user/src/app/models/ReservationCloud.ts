export class ReservationCloud {
    id: number;
    accommodationId: number;
    username: string;
    rating: number;
    comment: string;
    timestamp: Date;
    published: boolean;

    constructor(id, accommodationId, username, rating, comment, timestamp, published) {
        this.id = id;
        this.accommodationId = accommodationId;
        this.username = username;
        this.rating = rating;
        this.comment = comment;
        this.timestamp = timestamp;
        this.published = published;
    }
}
