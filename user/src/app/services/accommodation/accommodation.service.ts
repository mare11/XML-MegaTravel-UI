import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationSearchResult } from 'src/app/models/accommodation-search-result/accommodation-search-result';
import { AdditionalService } from 'src/app/models/additional-service/additional-service';
import { AccommodationType } from 'src/app/models/accommodation-type/accommodation-type';
import { Location } from 'src/app/models/location/location';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodations: Array<AccommodationSearchResult>;

  constructor(private http: HttpClient) {
    const additionalServices = new Array<AdditionalService>();
    additionalServices.push(new AdditionalService(1, 'Wifi'));
    additionalServices.push(new AdditionalService(2, 'Parking'));
    additionalServices.push(new AdditionalService(3, 'Pool'));
    additionalServices.push(new AdditionalService(4, 'Pets allowed'));
    additionalServices.push(new AdditionalService(5, 'TV'));
    additionalServices.push(new AdditionalService(6, 'Half board'));
    additionalServices.push(new AdditionalService(7, 'Full board'));

    const accommodationType1 = new AccommodationType(1, 'Hotel');
    const accommodationType2 = new AccommodationType(2, 'Bed & Breakfast');
    const accommodationType3 = new AccommodationType(3, 'Apartment');

    const location1 = new Location(1, 'Srbija', 'Novi Sad', 'Banijska 32', 45.242677, 19.799836);
    const location2 = new Location(2, 'Srbija', 'Novi Sad', 'Romanijska 2', 45.244093, 19.818931);
    const location3 = new Location(3, 'Srbija', 'Zrenjanin', 'Vukasinova 8d', 45.385685, 20.406277);
    // tslint:disable-next-line: max-line-length
    const accommodationSearchResult1 = new AccommodationSearchResult(7, accommodationType3, 3, additionalServices.slice(0, 2), true, 2, 'Neki opis', [], 4, location1, 30, 3.89);
    // tslint:disable-next-line: max-line-length
    const accommodationSearchResult2 = new AccommodationSearchResult(8, accommodationType3, 4, additionalServices.slice(1, 3), true, 3, 'Neki drugi opis', [], 4, location2, 35, 2.39);
    // tslint:disable-next-line: max-line-length
    const accommodationSearchResult3 = new AccommodationSearchResult(9, accommodationType1, 0, additionalServices.slice(0, 3), false, 0, 'Neki treci opis', [], 4, location3, 40, 50.02);

    this.accommodations = new Array();
    this.accommodations.push(accommodationSearchResult1);
    this.accommodations.push(accommodationSearchResult2);
    this.accommodations.push(accommodationSearchResult3);
  }

  getAccommodations(): Array<AccommodationSearchResult> {
    return this.accommodations;
  }

  getAccommodationById(id: number): AccommodationSearchResult {
    return this.accommodations.find(accommodation => accommodation.$id === id);
  }
}