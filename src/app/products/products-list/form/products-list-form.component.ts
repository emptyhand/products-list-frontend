import { Component, OnInit } from '@angular/core';
import { List } from "../../entities/list";
import { ListService } from "../../services/list.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-products-list-form',
  templateUrl: './products-list-form.component.html',
  styleUrls: ['./products-list-form.component.css']
})
export class ProductsListFormComponent implements OnInit {

  list: List;

  constructor(
    private listService: ListService,
    private router: Router
  ) {
    this.list = new List(null, null, [], false);
  }

  ngOnInit() {
    this.listService.listAdded.subscribe(
      (list: List) => {
        return this.router.navigateByUrl('/products/lists/' + list.id + '/items');
      }
    );
    this.listService.listSelected.subscribe(
      (list: List) => {
        this.list = list;
      }
    );
    this.listService.listDeleted.subscribe(
      (list: List) => {
        this.list = new List(null, null, [], false);
      }
    );
  }

  onDelete(list: List) {
    this.listService.delete(list);
  }

  onCancel() {
    this.list = new List(0, null);
  }

  onSubmit() {
    if (this.list.id) {
      this.listService.update(this.list);
    } else {
      this.listService.add(this.list.name);
    }
  }
}
