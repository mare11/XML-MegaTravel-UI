export class ReservationRating {
    private rating: number;
    private comment: string;
    private timestamp: Date;
    private published: boolean;

    constructor($rating: number, $comment: string, $timestamp: Date, $published: boolean) {
        this.rating = $rating;
        this.comment = $comment;
        this.timestamp = $timestamp;
        this.published = $published;
    }
}
