import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, catchError, Observable, of, Subject, tap } from 'rxjs';
import { Jwt } from 'src/app/user/models/Jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = 'http://localhost:8080';

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  signup(name: string, email: string, password: string) {
    return this.http.post<string>(this.API_URL + '/signup', {
        name,
        login: email,
        password
      });
  }

  login(email: string, password: string) {
    return new Observable(subscriber => {
      this.http.post<string>(this.API_URL + '/login', {
        login: email,
        password
      }).subscribe({
        next: s => {
          localStorage.setItem('token', s);
          this.loggedIn.next(true);
          subscriber.complete();
        }, error: err => subscriber.error(err)
      })
    });
  }

  isTokenValid(): Observable<boolean> {
    try {
      let decoded = this.decodeToken();
      if (!decoded) {
        this.loggedIn.next(false);
        return this.loggedIn.asObservable();
      }

      this.loggedIn.next(decoded.exp >= new Date().valueOf() / 1000);
    } catch (error) {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  decodeToken(): Jwt | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    return jwt_decode<Jwt>(token);
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }
}
