import { Injectable, EventEmitter } from '@angular/core';
import { List } from "../entities/list";
import { HttpService } from "../../http.service";

import { Observable } from "rxjs";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ListService {

  lists: Array<List> = [];

  listAdded: EventEmitter<List> = new EventEmitter<List>();
  listUpdated: EventEmitter<List> = new EventEmitter<List>();
  listDeleted: EventEmitter<List> = new EventEmitter<List>();
  listSelected: EventEmitter<List> = new EventEmitter<List>();

  constructor(
    private httpService: HttpService,
  ) { }

  all(): Observable<List[]> {
    return this.httpService.get('/lists');
  }

  delete(list: List) {
    this.httpService.delete('/lists/' + list.id)
      .subscribe(
        res => {
          this.listDeleted.emit(list);
        }
      );
  }

  add(name:string) {
    let list = new List(null, name, [], false);
    this.httpService.post('/lists', list)
      .subscribe(
        res => {
          list.id = res.id;
          this.listAdded.emit(list);
        }
    );
  }

  update(list: List) {
    this.httpService.put('/lists/' + list.id, list)
      .subscribe(
        (updated: List) => {
          this.listUpdated.emit(updated);
        }
      );
  }

  get(id: number) {
    return this.httpService.get('/lists/' + id);
  }
}
