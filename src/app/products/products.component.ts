import { Component, OnInit } from '@angular/core';
import { ProductService } from "./services/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  total: number = 0;

  constructor(
    private productService: ProductService
  ) {
    this.total = productService.getTotalQuantity();
  }

  ngOnInit() {
  }
}
