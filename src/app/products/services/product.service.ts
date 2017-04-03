import { Injectable, EventEmitter } from '@angular/core';
import { Response } from "@angular/http";
import { Product } from "../entities/product";
import { HttpService } from "../../http.service";
import { Observable } from "rxjs";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  products: Array<Product> = [];

  productsChanges: EventEmitter<Product> = new EventEmitter<Product>();
  productUpdated: EventEmitter<Product> = new EventEmitter<Product>();
  productsDeleted: EventEmitter<Product> = new EventEmitter<Product>();
  productSelected: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private httpService: HttpService,
  ) { }

  all(listId: number): Observable<Product[]> {
    return this.httpService
      .get('/lists/' + listId + '/products');
  }

  delete(listId:number, product: Product) {
    this.httpService
      .delete('/lists/' + listId + '/products/' + product.id)
      .subscribe(
        (res: Response) => {
          this.productsDeleted.emit(product);
        }
      );
  }

  add(listId:number, product: Product) {
    this.httpService
      .post('/lists/' + listId + '/products', product)
      .subscribe(
        (product: Product) => {
          this.productsChanges.emit(product);
        }
    );
  }

  update(listId:number, product: Product) {
    this.httpService
      .put('/lists/' + listId + '/products/' + product.id, product)
      .subscribe(
        (updated: Product) => {
          this.productUpdated.emit(updated);
        }
      );
  }

  get(listId:number, id: number) {
    return this.httpService
      .get('/lists/' + listId + '/products/' + id);
  }

  getTotalQuantity() {
    let total: number = 0;
    for (let i = 0; i < this.products.length; i++) {
      total += this.products[i].quantity;
    }
    return total;
  }
}
