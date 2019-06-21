import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('/api/user-service/admins/users');
  }

  deleteUser(user: any) {
    return this.http.put('/api/user-service/admins/users/delete', user);
  }

  disableUser(user: any) {
    return this.http.put('/api/user-service/admins/users/disable', user);
  }

  enableUser(user: any) {
    return this.http.put('/api/user-service//admins/users/enable', user);
  }
}
