import { Component, OnInit } from '@angular/core';
import { List } from "../products/entities/list";
import { ListService } from "../products/services/list.service";

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  styleUrls: ['shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  private lists: Array<List>;

  constructor(
    private listService: ListService
  ) {
    listService.all()
      .subscribe(lists => {
        this.lists = lists
      });
  }

  ngOnInit() {
  }
}
