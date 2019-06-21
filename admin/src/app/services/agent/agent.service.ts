import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserUniqueness } from 'src/app/models/UserUniqueness';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  getAgents() {
    return this.http.get('/api/user-service/admins/agents');
  }

  addAgent(agent: any) {
    return this.http.post('/api/user-service/admins/agents', agent);
  }

  checkuserUniqueness(userUniqueness: UserUniqueness) {
    return this.http.post('api/authentication-service/authentication/user', userUniqueness);
  }
}
