import { EventEmitter, Injectable } from '@angular/core';
import { HttpService } from "../http.service";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  public token: string = null;
  public username: string;

  public eventEmitter: EventEmitter<string> = new EventEmitter();

  constructor(
    public httpService: HttpService,
  ) {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.token = user.token;
      this.username = user.username;
    }
  }

  isLoggedIn(): boolean {
    return (this.token !== null);
  }

  login(email:string, password:string) {
    this.httpService
      .post('/login_check', {_username: email, _password: password})
      .subscribe(
        res => {
          if (!res) {
            this.eventEmitter.emit('error');
          } else {
            this.token = res.token;
            this.username = res.username;
            if (this.token) {
              localStorage.setItem('user', JSON.stringify({
                token: this.token,
                username: this.username
              }));
              this.eventEmitter.emit('logged-in');
            }
          }
        },
      );
  }

  register(email:string, password:string) {
    this.httpService
      .post('/register', {username: email, password: password})
      .subscribe(
        res => {
          this.token = res.token;
          this.username = res.username;
          if (this.token) {
            localStorage.setItem('user', JSON.stringify({
              token: this.token,
              username: this.username
            }));
            this.eventEmitter.emit('registered');
          }
        }
      );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('user');
    this.eventEmitter.emit('logged-out');
  }
}
