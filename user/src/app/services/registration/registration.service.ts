import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  checkUserByUsername(username: string) {
    return this.http.get('api/authentication-service/authentication/username/' + username);
  }

  checkUserByEmail(email: string) {
    return this.http.get('api/authentication-service/authentication/email/' + email);
  }

  registerUser(user: any) {
    return this.http.post('api/registration', user);
  }

  verifyUser(token: string) {
    return this.http.get('api/registration/verify?token=' + token);
  }

}
