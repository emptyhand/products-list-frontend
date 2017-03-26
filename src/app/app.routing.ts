
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { ProductsComponent } from "./products/products.component";

import { ShoppingListComponent } from "./shopping/shopping-list.component";
import { ShoppingListDetailComponent } from "./shopping/shopping-list-detail/shopping-list-detail.component";

import { SignupComponent } from "./auth/signup/signup.component";
import { SigninComponent } from "./auth/signin/signin.component";

import { PRODUCTS_ROUTES } from "./products/products.routes";
import { AuthGuardService } from "./auth/auth-guard.service";

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'shopping/:id', component: ShoppingListDetailComponent, canActivate: [AuthGuardService] },
  { path: 'shopping', component: ShoppingListComponent, canActivate: [AuthGuardService] },
  { path: 'products', component: ProductsComponent, children: PRODUCTS_ROUTES, canActivate: [AuthGuardService] },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
