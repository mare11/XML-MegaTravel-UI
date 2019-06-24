import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccommodationSearchObject } from 'src/app/models/accommodation-search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(searchObject: AccommodationSearchObject) {
    return this.http.post('/api/search-service/search', searchObject);
  }
}
