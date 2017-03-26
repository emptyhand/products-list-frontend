import { EventEmitter, Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { environment } from "../../environments/environment";

import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public token: string = null;
  public username: string;
  public baseUrl: string;

  constructor(
    private http: Http
  ) {
    this.baseUrl = environment.baseUrl;
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.token = user.token;
      this.username = user.username;
    }
  }

  isLoggedIn(): boolean {
    return (this.token !== null);
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
          return true;
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
    return this.http.post(this.baseUrl + '/register',
      JSON.stringify({
        username: email,
        password: password
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
          return true;
        } else {
          return false;
        }
      }
    );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('user');
  }

}
