import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  private baseUrl: string;

  public loading = false;

  constructor(
    private http: Http,
    private router: Router,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  private headers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      headers.append('Authorization', 'Bearer ' + user.token);
    }
    return headers;
  }

  private handleError(err: Response) {
    if (err.status == 401) {
      // redirect to login page if token is expired
      return this.router.navigateByUrl('/signin');
    }
    return Observable.throw(err || 'Server error');
  }

  private process(obj: Observable<any>): Observable<any> {
    return obj
      .map(
        (res: Response) => res.json()
      )
      .finally(
        () => { this.loading = false; }
      )
      .catch(
        (err: Response) => {
          return this.handleError(err);
        }
      );
  }

  get(url: string): Observable<any> {
    this.loading = true;
    return this.process(
      this.http.get(this.baseUrl + url, {
        headers: this.headers()
      })
    );
  }

  put(url: string, data): Observable<any> {
    this.loading = true;
    return this.process(
      this.http.put(this.baseUrl + url, JSON.stringify(data), {
        headers: this.headers()
      })
    );
  }

  delete(url: string): Observable<any> {
    this.loading = true;
    return this.process(
      this.http.delete(this.baseUrl + url, {
        headers: this.headers()
      })
    );
  }

  post(url: string, data:any): Observable<any> {
    this.loading = true;
    return this.process(
      this.http.post(this.baseUrl + url, JSON.stringify(data), {
        headers: this.headers()
      })
    );
  }
}
