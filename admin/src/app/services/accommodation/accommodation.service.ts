import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AccommodationType } from 'src/app/models/AccommodationType';
import { AdditionalService } from 'src/app/models/AdditionalServices';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  getAccommodationTypes() {
    return this.http.get('/api/accommodation-service/accommodationTypes');
  }

  addAccommodationtype(type: AccommodationType) {
    return this.http.post('/api/accommodation-service/accommodationTypes', type);
  }

  deleteAccommodationtype(type: AccommodationType) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: type
    };
    return this.http.delete('/api/accommodation-service/accommodationTypes', options);
  }

  getAdditionalServices() {
    return this.http.get('/api/accommodation-service/additionalService');
  }

  addAdditionalService(service: AdditionalService) {
    return this.http.post('/api/accommodation-service/additionalService', service);
  }

  deleteAdditionalService(service: AdditionalService) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: service
    };
    return this.http.delete('/api/accommodation-service/additionalService', options);
  }
}
