import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { product } from '../data-type';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  productAdd(data: product) {
    return this.http.post(`http://localhost:3000/product`,data)

  }

  getProductList() {
    return this.http.get<product[]>(`http://localhost:3000/product`);
  }
  getProduct(id:number) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`);
  }

  updateProduct(data:product){
    console.warn('data--------',data);
    return this.http.put<product>(`http://localhost:3000/product/${data.id}`,data);
  }

  deleteProduct(id:number){
    console.warn(id);
    console.warn("working till here");
    return this.http.delete(`http://localhost:3000/product/${id}`);
  }

}
