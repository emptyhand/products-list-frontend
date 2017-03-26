import { Routes } from "@angular/router";
import { ProductsListComponent } from "./products-list/products-list.component";
import { ProductsItemComponent } from "./products-item/products-item.component";

export const PRODUCTS_ROUTES: Routes = [
  { path: 'lists/:listId/edit/:id', component: ProductsItemComponent },
  { path: 'lists/:listId/items', component: ProductsItemComponent },
  { path: 'lists/:id', component: ProductsListComponent },
  { path: 'lists', component: ProductsListComponent },
];
