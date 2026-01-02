import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private ApiUrl = '';

  constructor(private http: HttpClient) {}

  Login(email: string, password: string) {
    return this.http.post<{ token: string }>(this.ApiUrl, {
      email,
      password,
    });
  }

  Savetoken(token: string) {
    localStorage.setItem('token', token);
  }

  GetToken() {
    return localStorage.getItem('token');
  }

  loggout() {
    localStorage.removeItem('token');
  }

  Islogged() {
    return !!this.GetToken();
  }
}
