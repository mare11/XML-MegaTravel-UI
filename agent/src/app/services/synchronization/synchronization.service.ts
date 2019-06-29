import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class SynchronizationService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  synchronize() {
    const id = this.authService.getId();
    return this.http.post('/api/synchronize/' + id, null);
  }

  desynchronize() {
    return this.http.delete('/api/synchronize');
  }
}
