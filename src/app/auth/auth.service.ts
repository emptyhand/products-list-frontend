import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private baseUrl:string = 'http://localhost:8000/api';

  public token: string = null;
  public username: string;
  public isLoggedIn: boolean = false;

  constructor(
    private http: Http
  ) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.token = user && user.token;
      this.isLoggedIn = true;
    }
  }

  /**
   *
   * @param email: string
   * @param password
   * @returns {Observable<R>}
   */
  login(email:string, password:string) {
    return this.http.post(this.baseUrl + '/login_check',
      JSON.stringify({
        _username: email,
        _password: password
      }),
      { headers: new Headers({ 'Content-Type': 'application/json' }) }
    ).map(
      (res: Response) => {
        this.token = res.json() && res.json().token;
        this.username = res.json() && res.json().username;
        if (this.token) {
          localStorage.setItem('user', JSON.stringify({
            token: this.token,
            username: this.username
          }));
          return (this.isLoggedIn = true);
        } else {
          return false;
        }
      }
    );
  }

  /**
   *
   * @param email
   * @param password
   */
  register(email:string, password:string) {

  }

  logout() {
    this.token = null;
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

}
