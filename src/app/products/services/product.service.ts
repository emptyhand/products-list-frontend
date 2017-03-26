import { Injectable, EventEmitter } from '@angular/core';
import { Product } from "../entities/product";
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  private baseUrl:string = 'http://localhost:8000/api';

  products: Array<Product> = [];

  productsChanges: EventEmitter<Product> = new EventEmitter<Product>();
  productUpdated: EventEmitter<Product> = new EventEmitter<Product>();
  productsDeleted: EventEmitter<Product> = new EventEmitter<Product>();
  productSelected: EventEmitter<Product> = new EventEmitter<Product>();

  constructor(
    private http: Http,
    private authService: AuthService
  ) {}

  all(listId: number): Observable<Product[]> {
    return this.http
      .get(
        this.baseUrl + '/lists/' + listId + '/products',
        { headers: new Headers({ 'Authorization': 'Bearer ' + this.authService.token }) }
      )
      .map((res: Response) => res.json());
  }

  delete(listId:number, product: Product) {
    this.http.delete(this.baseUrl + '/lists/' + listId + '/products/' + product.id,
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    )
      .subscribe(
        (res: Response) => {
          this.productsDeleted.emit(product);
        }
      );
  }

  add(listId:number, product: Product) {
    this.http.post(this.baseUrl + '/lists/' + listId + '/products'  ,
      JSON.stringify(product),
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    )
      .map((res: Response) => res.json())
      .subscribe(
        (product: Product) => {
          this.productsChanges.emit(product);
        }
    );
  }

  update(listId:number, product: Product) {
    this.http.put(this.baseUrl + '/lists/' + listId + '/products/' + product.id,
      JSON.stringify(product),
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    )
      .map((res: Response) => res.json())
      .subscribe(
        (updated: Product) => {
          this.productUpdated.emit(updated);
        }
      );
  }

  get(listId:number, id: number) {
    return this.http.get(this.baseUrl + '/lists/' + listId + '/products/' + id,
      { headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authService.token }) }
    ).map((res: Response) => res.json());
  }

  getTotalQuantity() {
    let total: number = 0;
    for (let i = 0; i < this.products.length; i++) {
      total += this.products[i].quantity;
    }
    return total;
  }

}
