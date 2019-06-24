import { DirectionEnum } from './DirectionEnum';

export class Message {
    content: string;
    dateTime: Date;
    direction: DirectionEnum;

    constructor(content, dateTime, direction) {
        this.content = content;
        this.dateTime = dateTime;
        this.direction = direction;
    }
}
