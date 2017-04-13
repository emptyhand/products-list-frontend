import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { Product } from "../../entities/product";
import { List } from "../../entities/list";

@Component({
  selector: 'app-product-form',
  templateUrl: 'product-form.component.html'
})
export class ProductFormComponent implements OnInit {

  @Input()
  private model: Product = new Product(0, null, null, null, false);

  @Input()
  private list: List;

  private isNew: boolean = true;

  constructor(
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.productService.productSelected.subscribe(
      (product: Product) => {
        this.model = product;
        this.isNew = false;
      }
    );
  }

  onCancel() {
    this.model = new Product(0, null, null, null, false);
    this.isNew = true;
  }

  onSubmit() {
    if (this.isNew) {
      this.productService.add(this.list.id, this.model);
    } else {
      this.productService.update(this.list.id, this.model);
    }
    this.isNew = true;
    this.model = new Product(0, null, null, null, false);
  }
}
