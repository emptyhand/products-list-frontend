import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { List } from "../../products/entities/list";
import { ListService } from "../../products/services/list.service";
import { Product } from "../../products/entities/product";
import { ProductService } from "../../products/services/product.service";

import { Subscription } from "rxjs";

@Component({
selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['shopping-list-detail.component.scss']
})
export class ShoppingListDetailComponent implements OnInit, OnDestroy {

  private list: List = new List(null, null, []);
  private products: Product[] = [];

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.listService.get(params['id'])
            .subscribe(
              (list: List) => {
                this.list = list;
              }
            );
          this.productService.all(params['id'])
            .subscribe(
              (products: Product[]) => {
                this.products = products;
              }
            );
        }
      }
    );
  }

  onClick(product: Product, isChecked: boolean) {
    product.added = isChecked;
    this.productService.update(this.list.id, product);
    // move product to the products-list end if checked
    if (isChecked) {
      this.products.splice(this.products.indexOf(product), 1);
      this.products.push(product);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
