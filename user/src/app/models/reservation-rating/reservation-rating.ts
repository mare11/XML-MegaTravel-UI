export class ReservationRating {
    private rating: string;
    private comment: string;
    private timestamp: Date;
    private published: string;

    constructor($rating: string, $comment: string, $timestamp: Date, $published: string) {
        this.rating = $rating;
        this.comment = $comment;
        this.timestamp = $timestamp;
        this.published = $published;
    }

    /**
     * Getter $rating
     * @return {string}
     */
    public get $rating(): string {
        return this.rating;
    }

    /**
     * Getter $comment
     * @return {string}
     */
    public get $comment(): string {
        return this.comment;
    }

    /**
     * Getter $timestamp
     * @return {Date}
     */
    public get $timestamp(): Date {
        return this.timestamp;
    }

    /**
     * Getter $published
     * @return {string}
     */
    public get $published(): string {
        return this.published;
    }

    /**
     * Setter $rating
     * @param {string} value
     */
    public set $rating(value: string) {
        this.rating = value;
    }

    /**
     * Setter $comment
     * @param {string} value
     */
    public set $comment(value: string) {
        this.comment = value;
    }

    /**
     * Setter $timestamp
     * @param {Date} value
     */
    public set $timestamp(value: Date) {
        this.timestamp = value;
    }

    /**
     * Setter $published
     * @param {string} value
     */
    public set $published(value: string) {
        this.published = value;
    }
}
