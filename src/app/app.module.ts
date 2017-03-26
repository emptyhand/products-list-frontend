import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsItemComponent } from "./products/products-item/products-item.component";
import { ShoppingListComponent } from './shopping/shopping-list.component';

import { AuthService } from "./auth/auth.service";
import { ProductService } from "./products/services/product.service";
import { ListService } from "./products/services/list.service";

import { ProductsComponent } from './products/products.component';
import { ProductFormComponent } from './products/products-item/form/product-form.component';

import { AppComponent } from './app.component';

import { routing } from "./app.routing";
import { ProductsListFormComponent } from './products/products-list/form/products-list-form.component';
import { ShoppingListDetailComponent } from './shopping/shopping-list-detail/shopping-list-detail.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductFormComponent,
    ProductsListComponent,
    ProductsItemComponent,
    ShoppingListComponent,
    ProductsListFormComponent,
    ShoppingListDetailComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    ProductService,
    ListService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
