import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationSearchResult } from 'src/app/models/accommodation-search-result/accommodation-search-result';
import { Location } from 'src/app/models/location/location';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  changeAccommodations(accomodations: Array<AccommodationSearchResult>) {
    localStorage.setItem('accommodations', JSON.stringify(accomodations));
  }

  changeLocation(location: Location) {
    localStorage.setItem('location', JSON.stringify(location));
  }

  changeCheckInDate(checkInDate: Date) {
    localStorage.setItem('checkInDate', JSON.stringify(checkInDate));
  }
  changeCheckOutDate(checkOutDate: Date) {
    localStorage.setItem('checkOutDate', JSON.stringify(checkOutDate));
  }

  changeNumberOfPersons(numberOfPersons: number) {
    localStorage.setItem('numberOfPersons', JSON.stringify(numberOfPersons));
  }

  getAccommodationTypes() {
    return this.http.get('/api/accommodation-service/accommodationTypes');
  }

  getAdditionalServices() {
    return this.http.get('/api/accommodation-service/additionalService');
  }

  getAccommodation(id: number) {
    return this.http.get('/api/accommodation-service/accommodations/details/' + id);
  }

  getAccommodationRatings(id: number) {
    return this.http.get('/api/accommodation-service/accommodations/' + id + '/reviews/published');
  }

  getAccommodationAverageRating(id: number) {
    return this.http.get('/api/accommodation-service/accommodations/reviews/average/' + id);
  }
}
