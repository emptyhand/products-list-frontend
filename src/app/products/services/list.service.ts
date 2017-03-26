import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { AuthService } from "../../auth/auth.service";
import { List } from "../entities/list";

import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {

  private baseUrl:string = 'http://localhost:8000/api';

  lists: Array<List> = [];

  listAdded: EventEmitter<List> = new EventEmitter<List>();
  listUpdated: EventEmitter<List> = new EventEmitter<List>();
  listDeleted: EventEmitter<List> = new EventEmitter<List>();
  listSelected: EventEmitter<List> = new EventEmitter<List>();

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  all(): Observable<List[]> {
    return this.http
      .get(
        this.baseUrl + '/lists',
        { headers: new Headers({ 'Authorization': 'Bearer ' + this.authService.token }) }
      )
      .map((res: Response) => res.json());
  }

  delete(list: List) {
    this.http.delete(this.baseUrl + '/lists/' + list.id,
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    ).subscribe(
      res => {
        this.listDeleted.emit(list);
      }
    );
  }

  add(name:string) {
    let list = new List(null, name, [], false);
    this.http.post(this.baseUrl + '/lists',
      JSON.stringify(list),
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    )
      .map((res: Response) => res.json())
      .subscribe(
        res => {
          list.id = res.id;
          this.listAdded.emit(list);
        }
    );
  }

  update(list: List) {
    this.http.put(this.baseUrl + '/lists/' + list.id,
      JSON.stringify(list),
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    )
      .map((res: Response) => res.json())
      .subscribe(
        (updated: List) => {
          this.listUpdated.emit(updated);
        }
      );
  }

  get(id: number) {
    return this.http.get(this.baseUrl + '/lists/' + id,
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    ).map((res: Response) => res.json());
  }
}
