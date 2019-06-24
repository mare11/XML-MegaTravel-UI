export class PeriodPrice {
    startDate: Date;
    endDate: Date;
    price: number;

    constructor(startDate, endDate, price) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.price = price;
    }
}
