import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Product } from "../entities/product";
import { ProductService } from "../services/product.service";
import { List } from "../entities/list";
import { ListService } from "../services/list.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-products-item',
  templateUrl: './products-item.component.html',
  styleUrls: ['./products-item.component.css']
})
export class ProductsItemComponent implements OnInit, OnDestroy {

  list: List = new List(0, null, [], false);
  products: Product[] = [];

  subscription: Subscription;

  constructor(
    private productService: ProductService,
    private listService: ListService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.route.params.subscribe(
      params => {
        if (params.hasOwnProperty('listId')) {
          this.listService.get(params['listId']).subscribe(
            (list: List) => {
              this.list = list;
            }
          );
          this.productService.all(params['listId']).subscribe(
            (products: Product[]) => {
              this.products = products;
            }
          );
        }
      }
    );
  }

  ngOnInit() {

    this.productService.productsChanges.subscribe(
      (product: Product) => {
        this.products.unshift(product);
      }
    );

    this.productService.productsDeleted.subscribe(
      (product: Product) => {
        this.products.splice(this.products.indexOf(product), 1);
      }
    );
  }

  onSelect(product: Product) {
    this.productService.productSelected.emit(product);
  }

  onDelete(product: Product) {
    this.productService.delete(this.list.id, product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
