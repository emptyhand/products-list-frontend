import { Component, OnInit } from '@angular/core';

import { List } from "../entities/list";
import { ListService } from "../services/list.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  lists: Array<List> = [];

  constructor(
    private listService: ListService,
  ) {
    this.listService.all()
      .subscribe(
        lists => {
          this.lists = lists || [];
        }
      );
  }

  onSelect(list: List) {
    this.listService.listSelected.emit(list);
  }

  ngOnInit() {
    this.listService.listAdded.subscribe(
      (list: List) => {
        this.lists.unshift(list);
      }
    );
    this.listService.listDeleted.subscribe(
      (list: List) => {
        this.lists.splice(this.lists.indexOf(list), 1);
      }
    );
  }
}
