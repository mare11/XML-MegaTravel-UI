import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  getAccommodations() {
    return this.http.get('/api/accommodation');
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
    return this.http.get('/api/accommodationtype');
  }

  getAdditionalServices() {
    return this.http.get('/api/additionalservices');
  }

  getAccommodationRatings(id: number) {
    return this.http.get('/api/reviews/' + id);
  }

  getAccommodationAverageRating(id: number) {
    return this.http.get('/api/averagerating/' + id);
  }
}
