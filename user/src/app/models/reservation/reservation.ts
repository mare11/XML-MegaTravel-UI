import { Message } from '../message/message';
import { ReservationRating } from '../reservation-rating/reservation-rating';

export class Reservation {
    private id: number;
    private accommodationId: number;
    private userId: number;
    private startDate: string;
    private endDate: string;
    private realized: string;
    private ReservationRating: ReservationRating;
    private Message: Message;


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
     * @return {string}
     */
    public get $startDate(): string {
        return this.startDate;
    }

    /**
     * Getter $endDate
     * @return {string}
     */
    public get $endDate(): string {
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
     * Getter $ReservationRating
     * @return {ReservationRating}
     */
    public get $ReservationRating(): ReservationRating {
        return this.ReservationRating;
    }

    /**
     * Getter $Message
     * @return {Message}
     */
    public get $Message(): Message {
        return this.Message;
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
     * @param {string} value
     */
    public set $startDate(value: string) {
        this.startDate = value;
    }

    /**
     * Setter $endDate
     * @param {string} value
     */
    public set $endDate(value: string) {
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
     * Setter $ReservationRating
     * @param {ReservationRating} value
     */
    public set $ReservationRating(value: ReservationRating) {
        this.ReservationRating = value;
    }

    /**
     * Setter $Message
     * @param {Message} value
     */
    public set $Message(value: Message) {
        this.Message = value;
    }

}
