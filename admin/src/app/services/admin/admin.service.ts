import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addAdmin(admin: any) {
    return this.http.post('/api/user-service/admins', admin);
  }
}
