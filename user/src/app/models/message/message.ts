import { DirectionEnum } from 'src/app/utils';

export class Message {
    private content: string;
    private timestamp: Date;
    private direction: DirectionEnum;

    constructor($content: string, $timestamp: Date, $direction: DirectionEnum) {
        this.content = $content;
        this.timestamp = $timestamp;
        this.direction = $direction;
    }

    /**
     * Getter $content
     * @return {string}
     */
    public get $content(): string {
        return this.content;
    }

    /**
     * Getter $timestamp
     * @return {Date}
     */
    public get $timestamp(): Date {
        return this.timestamp;
    }

    /**
     * Getter $direction
     * @return {DirectionEnum}
     */
    public get $direction(): DirectionEnum {
        return this.direction;
    }

    /**
     * Setter $content
     * @param {string} value
     */
    public set $content(value: string) {
        this.content = value;
    }

    /**
     * Setter $timestamp
     * @param {Date} value
     */
    public set $timestamp(value: Date) {
        this.timestamp = value;
    }

    /**
     * Setter $direction
     * @param {DirectionEnum} value
     */
    public set $direction(value: DirectionEnum) {
        this.direction = value;
    }

}
