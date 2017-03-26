
import { Routes, RouterModule } from "@angular/router";

import { ProductsComponent } from "./products/products.component";

import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { ShoppingListDetailComponent } from "./shopping/shopping-list-detail/shopping-list-detail.component";

import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";

import { PRODUCTS_ROUTES } from "./products/products.routes";

const APP_ROUTES: Routes = [
  { path: 'shopping/:id', component: ShoppingListDetailComponent },
  { path: 'shopping', component: ShoppingListComponent },
  { path: 'products', component: ProductsComponent, children: PRODUCTS_ROUTES },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
