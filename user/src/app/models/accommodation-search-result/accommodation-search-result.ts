import { AccommodationType } from '../accommodation-type/accommodation-type';
import { AdditionalService } from '../additional-service/additional-service';
import { Location } from '../location/location';
import { Unavailability } from '../Unavailability';

export class AccommodationSearchResult {
     id: number;
     accommodationType: AccommodationType;
     category: number;
     additionalServices: AdditionalService[];
     freeCancellation: boolean;
     cancellationDays: number;
     description: string;
     images: string[];
     numberOfPersons: number;
     location: Location;
     priceForRequestedPeriod: number;
     distance: number;
     averageRating: number;
     unavailability: Unavailability;

    constructor(id: number, accommodationType: AccommodationType, category: number, additionalServices: AdditionalService[],
                freeCancellation: boolean, cancellationDays: number, description: string, images: string[], numberOfPersons: number,
                location: Location, priceForRequestedPeriod: number, distance: number, averageRating: number) {
        this.id = id;
        this.accommodationType = accommodationType;
        this.category = category;
        this.additionalServices = additionalServices;
        this.freeCancellation = freeCancellation;
        this.cancellationDays = cancellationDays;
        this.description = description;
        this.images = images;
        this.numberOfPersons = numberOfPersons;
        this.location = location;
        this.priceForRequestedPeriod = priceForRequestedPeriod;
        this.distance = distance;
        this.averageRating = averageRating;
    }
}
