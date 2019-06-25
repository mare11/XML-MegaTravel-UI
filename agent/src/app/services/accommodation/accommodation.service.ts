import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Accommodation } from 'src/app/models/Accommodation';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalService';
import { Location } from 'src/app/models/Location';
import { PeriodPrice } from 'src/app/models/PeriodPrice';
import { Unavailability } from 'src/app/models/Unavailability';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  accommodations: Array<Accommodation>;
  accommodationTypes: Array<AccommodationType>;
  additionalServices: Array<AdditionalService>;

  constructor(private http: HttpClient) {

    this.additionalServices = new Array<AdditionalService>();
    this.additionalServices.push(new AdditionalService(1, 'Wifi'));
    this.additionalServices.push(new AdditionalService(2, 'Parking'));
    this.additionalServices.push(new AdditionalService(3, 'Pool'));
    this.additionalServices.push(new AdditionalService(4, 'Pets allowed'));
    this.additionalServices.push(new AdditionalService(5, 'TV'));
    this.additionalServices.push(new AdditionalService(6, 'Half board'));
    this.additionalServices.push(new AdditionalService(7, 'Full board'));

    this.accommodationTypes = new Array<AccommodationType>();
    const accommodationType1 = new AccommodationType(1, 'Hotel');
    const accommodationType2 = new AccommodationType(2, 'Bed & Breakfast');
    const accommodationType3 = new AccommodationType(3, 'Apartment');
    this.accommodationTypes.push(accommodationType1);
    this.accommodationTypes.push(accommodationType2);
    this.accommodationTypes.push(accommodationType3);

    const location1 = new Location('Srbija', 'Novi Sad', 'Banijska 32', 45.242677, 19.799836);
    const location2 = new Location('Srbija', 'Novi Sad', 'Romanijska 2', 45.244093, 19.818931);
    const location3 = new Location('Srbija', 'Zrenjanin', 'Vukasinova 8d', 45.385685, 20.406277);
    // tslint:disable-next-line: max-line-length
    const accommodationSearchResult1 = new Accommodation(7, accommodationType3, 3, this.additionalServices.slice(0, 2), true, 2, 'Neki opis', 4, 15, location1);
    // tslint:disable-next-line: max-line-length
    const accommodationSearchResult2 = new Accommodation(8, accommodationType3, 4, this.additionalServices.slice(1, 3), true, 3, 'Neki drugi opis', 3, 10, location2);
    // tslint:disable-next-line: max-line-length
    const accommodationSearchResult3 = new Accommodation(9, accommodationType1, 0, this.additionalServices.slice(0, 3), false, 0, 'Neki treci opis', 4, 12, location3);

    const period1 = new PeriodPrice('2019-06-20', '2019-06-30', 15);
    const period2 = new PeriodPrice('2019-07-01', '2019-07-15', 20);
    const period3 = new PeriodPrice('2019-07-16', '2019-07-31', 25);

    accommodationSearchResult1.periodPrice.push(period1);
    accommodationSearchResult1.periodPrice.push(period2);
    accommodationSearchResult1.periodPrice.push(period3);
    accommodationSearchResult2.periodPrice.push(period1);
    accommodationSearchResult2.periodPrice.push(period2);
    accommodationSearchResult2.periodPrice.push(period3);
    accommodationSearchResult3.periodPrice.push(period1);
    accommodationSearchResult3.periodPrice.push(period2);
    accommodationSearchResult3.periodPrice.push(period3);

    const unv1 = new Unavailability('2019-05-20', '2019-06-10');
    const unv2 = new Unavailability('2019-09-15', '2019-10-01');

    accommodationSearchResult1.unavailability.push(unv1);
    accommodationSearchResult1.unavailability.push(unv2);
    accommodationSearchResult2.unavailability.push(unv1);
    accommodationSearchResult2.unavailability.push(unv2);
    accommodationSearchResult3.unavailability.push(unv1);
    accommodationSearchResult3.unavailability.push(unv2);

    this.accommodations = new Array();
    this.accommodations.push(accommodationSearchResult1);
    this.accommodations.push(accommodationSearchResult2);
    this.accommodations.push(accommodationSearchResult3);
  }

  getAccommodations() {
    // return this.http.get('/api/accommodation');
    return this.accommodations;
  }

  getAccommodationById(id: number) {
    return this.http.get('/api/accommodation/' + id);
  }

  addAccommodation(accommodation) {
    return this.http.post('/api/accommodation', accommodation);
  }

  updateAccommodation(accommodation) {
    return this.http.put('/api/accommodation', accommodation);
  }

  getAccommodationTypes() {
    // return this.http.get('/api/accommodation-service/accommodationTypes');
    return this.accommodationTypes;
  }

  getAdditionalServices() {
    // return this.http.get('/api/accommodation-service/additionalService');
    return this.additionalServices;
  }

  getAccommodationRatings(id: number) {
    return this.http.get('/api/accommodation-service/accommodations/' + id + '/reviews/all');
  }

  getAccommodationAverageRating(id: number) {
    return this.http.get('/api/accommodation-service/accommodations/reviews/average/' + id);
  }
}
