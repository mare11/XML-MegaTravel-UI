import { AccommodationType } from './AccommodationType';
import { AdditionalService } from './AdditionalService';
import { Location } from './Location';
import { PeriodPrice } from './PeriodPrice';
import { Unavailability } from './Unavailability';

export class Accommodation {
    id: number;
    accommodationType: AccommodationType;
    category: number;
    additionalServices: AdditionalService[];
    freeCancellation: boolean;
    cancellationDays: number;
    description: string;
    images: string[];
    numberOfPersons: number;
    defaultPrice: number;
    periodPrices: PeriodPrice[];
    location: Location;
    unavailabilities: Unavailability[];

    constructor(
        id: number,
        accommodationType: AccommodationType, category: number, additionalServices: AdditionalService[],
        freeCancellation: boolean, cancellationDays: number, description: string,
        numberOfPersons: number, defaultPrice: number, location: Location) {

        this.id = id;
        this.accommodationType = accommodationType;
        this.category = category;
        this.additionalServices = additionalServices;
        this.freeCancellation = freeCancellation;
        this.cancellationDays = cancellationDays;
        this.description = description;
        this.numberOfPersons = numberOfPersons;
        this.defaultPrice = defaultPrice;
        this.location = location;
        this.periodPrices = [];
        this.unavailabilities = [];
    }
}
