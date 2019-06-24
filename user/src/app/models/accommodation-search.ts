import { Location } from './location/location';

export class AccommodationSearchObject {
    location: Location;
    startDate: Date;
    endDate: Date;
    numberOfPersons: number;
    accommodationTypes: string[];
    categories: number[];
    additionalServices: string[];
    distanceFromLocation: number;

    constructor(location, startDate, endDate, numberOfPersons, accommodationTypes, categories, additionalServices, distanceFromLocation) {
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.numberOfPersons = numberOfPersons;
        this.accommodationTypes = accommodationTypes;
        this.categories = categories;
        this.additionalServices = additionalServices;
        this.distanceFromLocation = distanceFromLocation;
    }
}