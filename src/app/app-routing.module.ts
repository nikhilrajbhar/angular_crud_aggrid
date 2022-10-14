import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductComponent } from './product/product.component';
import { ProductsHomeComponent } from './products-home/products-home.component';

const routes: Routes = [
  { path: '', component: ProductsHomeComponent },
  { path: 'product/:id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
