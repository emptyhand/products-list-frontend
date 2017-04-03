import { Injectable } from '@angular/core';
import { Headers, Http, Response } from "@angular/http";
import { AuthService } from "./auth/auth.service";
import { environment } from "../environments/environment";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {

  private baseUrl: string;

  constructor(
    private http: Http,
    private authService: AuthService,
    private router: Router,
  ) {
    this.baseUrl = environment.baseUrl;
  }

  private headers() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    if (this.authService.isLoggedIn()) {
      headers.append('Authorization', 'Bearer ' + this.authService.token);
    };
    return headers;
  }

  get(url: string): Observable<any> {
    return this.http.get(this.baseUrl + url, {
      headers: this.headers()
    })
      .map((res: Response) => res.json())
      .catch((err:any) =>{
        // if token is expired
        if (err.status == 401) {
          return this.router.navigateByUrl('/signin');
        }
        return Observable.of(err);
      });
  }

  put(url: string, data): Observable<any> {
    return this.http.put(this.baseUrl + url, JSON.stringify(data), {
        headers: this.headers()
    }).map((res: Response) => res.json());
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.baseUrl + url, {
        headers: this.headers()
    }).map((res: Response) => res.json());
  }

  post(url: string, data:any): Observable<any> {
      return this.http.post(this.baseUrl + url, JSON.stringify(data), {
          headers: this.headers()
      }).map((res: Response) => res.json());
  }
}
