import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  onSubject = new Subject<{ key: string, value: any }>();
  userKey = 'authUser';

  constructor(private http: HttpClient) {
    if (localStorage.getItem(this.userKey)) {
      this.onSubject.next({ key: this.userKey, value: JSON.parse(localStorage.getItem(this.userKey)) });
    }
  }

  setUserState(userState: string) {
    localStorage.setItem(this.userKey, JSON.stringify(userState));
    this.onSubject.next({ key: this.userKey, value: userState });
  }

  removeUserState() {
    localStorage.removeItem(this.userKey);
    this.onSubject.next({ key: this.userKey, value: null });
  }

  getAccessToken(): string {
    if (!JSON.parse(localStorage.getItem(this.userKey))) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.userKey)).accessToken;
  }

  getUsername(): string {
    if (!JSON.parse(localStorage.getItem(this.userKey))) {
      return null;
    }
    return JSON.parse(localStorage.getItem(this.userKey)).username;
  }

  login(authRequest: any) {
    return this.http.post('/api/authentication-service/authentication', authRequest);
  }

  logout() {
    return this.http.get('/logout_user');
  }
}
