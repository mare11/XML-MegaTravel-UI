export class Location {
    id: number;
    country: string;
    city: string;
    address: string;
    latitude: number;
    longitude: number;

    constructor(country: string, city: string, address: string, latitude: number, longitude: number) {
        this.country = country;
        this.city = city;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
