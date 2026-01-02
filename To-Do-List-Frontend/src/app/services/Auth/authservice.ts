import { HttpClient, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Route, Router, RouterLink, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authservice {
  private ApiUrl = 'http://localhost:5195/login';


  constructor(private http: HttpClient, private router : Router) {}

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
     return  this.router.navigate(['/login'])
    
  }

  Islogged() {
    return !!this.GetToken();
  }

   handleError(http : HttpErrorResponse)
  {

    switch(http.status)

    {
       case 404:
        return "Usuário não encontrado, faça se registro"

        case 401:
        return "Usuário não Autorizado"

        default:
          return ''
    }

  }
}
