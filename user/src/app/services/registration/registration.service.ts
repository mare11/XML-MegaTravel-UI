import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUniqueness } from 'src/app/models/UserUniqueness';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  checkuserUniqueness(userUniqueness: UserUniqueness) {
    return this.http.post('api/authentication-service/authentication/user', userUniqueness);
  }

  registerUser(user: any) {
    return this.http.post('api/registration', user);
  }

  verifyUser(token: string) {
    return this.http.get('api/registration/verify?token=' + token);
  }

}
