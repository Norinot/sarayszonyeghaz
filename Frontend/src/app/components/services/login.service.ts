import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private httpClient = inject(HttpClient);
  private token = '';

  login(data: { username: string, password: string }) {
    return this.httpClient.post("http://localhost:8085/login", data)
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
