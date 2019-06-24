import { Message } from '../message/message';
import { ReservationRating } from '../reservation-rating/reservation-rating';

export class Reservation {
    private id: number;
    private accommodationId: number;
    private userId: number;
    private startDate: Date;
    private endDate: Date;
    private realized: string;
    private price: number;
    private ReservationRating: ReservationRating;
    private messages: Array<Message>;


    /**
     * Getter $id
     * @return {number}
     */
    public get $id(): number {
        return this.id;
    }

    /**
     * Getter $accommodationId
     * @return {number}
     */
    public get $accommodationId(): number {
        return this.accommodationId;
    }

    /**
     * Getter $userId
     * @return {number}
     */
    public get $userId(): number {
        return this.userId;
    }

    /**
     * Getter $startDate
     * @return {Date}
     */
    public get $startDate(): Date {
        return this.startDate;
    }

    /**
     * Getter $endDate
     * @return {Date}
     */
    public get $endDate(): Date {
        return this.endDate;
    }

    /**
     * Getter $realized
     * @return {string}
     */
    public get $realized(): string {
        return this.realized;
    }

    /**
     * Getter $price
     * @return {number}
     */
    public get $price(): number {
        return this.price;
    }

    /**
     * Getter $ReservationRating
     * @return {ReservationRating}
     */
    public get $ReservationRating(): ReservationRating {
        return this.ReservationRating;
    }

    /**
     * Getter $messages
     * @return {Array<Message>}
     */
    public get $messages(): Array<Message> {
        return this.messages;
    }

    /**
     * Setter $id
     * @param {number} value
     */
    public set $id(value: number) {
        this.id = value;
    }

    /**
     * Setter $accommodationId
     * @param {number} value
     */
    public set $accommodationId(value: number) {
        this.accommodationId = value;
    }

    /**
     * Setter $userId
     * @param {number} value
     */
    public set $userId(value: number) {
        this.userId = value;
    }

    /**
     * Setter $startDate
     * @param {Date} value
     */
    public set $startDate(value: Date) {
        this.startDate = value;
    }

    /**
     * Setter $endDate
     * @param {Date} value
     */
    public set $endDate(value: Date) {
        this.endDate = value;
    }

    /**
     * Setter $realized
     * @param {string} value
     */
    public set $realized(value: string) {
        this.realized = value;
    }

    /**
     * Setter $price
     * @param {number} value
     */
    public set $price(value: number) {
        this.price = value;
    }

    /**
     * Setter $ReservationRating
     * @param {ReservationRating} value
     */
    public set $ReservationRating(value: ReservationRating) {
        this.ReservationRating = value;
    }

    /**
     * Setter $messages
     * @param {Array<Message>} value
     */
    public set $messages(value: Array<Message>) {
        this.messages = value;
    }

}
