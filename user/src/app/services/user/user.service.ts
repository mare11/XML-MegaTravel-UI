import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getOneUser(username: string) {
    return this.http.get('/api/user-service/users/' + username);
  }

  updateUser(user: any) {
    return this.http.put('/api/user-service/users', user);
  }
}
