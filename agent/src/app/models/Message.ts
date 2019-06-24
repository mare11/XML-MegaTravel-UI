import { DirectionEnum } from './DirectionEnum';

export class Message {
    content: string;
    timestamp: Date;
    direction: DirectionEnum;

    constructor(content, timestamp, direction) {
        this.content = content;
        this.timestamp = timestamp;
        this.direction = direction;
    }
}
