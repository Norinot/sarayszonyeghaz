import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IProduct } from '../shared/product-card/interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private httpClient = inject(HttpClient);

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>("http://localhost:8085/products");
  }

  createNewProduct(product: FormData) {
    console.log(product);
    return this.httpClient.post("http://localhost:8085/products", product, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTc0MjM0MTgsImlkIjoxLCJvcmlnX2lhdCI6MTcxNzQxOTgxOH0.SPXRHeX3Q7e4Pa2D57hIb4MVAzIFgb_SSv7G6l5I82Q`
      }
    })
  }

  removeSelectedProduct(id: string) {
    return this.httpClient.delete(`http://localhost:8085/products/${id}`)
  }

  getSpecificProductById(id: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(`http://localhost:8085/products/${id}`)
  }
}
