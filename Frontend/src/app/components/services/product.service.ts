import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { IProduct } from '../shared/product-card/interfaces/product.interface'
import { Observable, map } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient = inject(HttpClient)
  allProducts: IProduct[] = []

  getAllProducts(): Observable<IProduct[]> {
    return this.httpClient.get<IProduct[]>('http://localhost:8085/products')
  }

  createNewProduct(product: FormData) {
    return this.httpClient.post('http://localhost:8085/products', product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }

  updateSelectedProduct(product: FormData, id: string) {
    return this.httpClient.put(
      `http://localhost:8085/products/${id}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    )
  }

  removeSelectedProduct(id: string) {
    return this.httpClient.delete(`http://localhost:8085/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }

  getSpecificProductById(id: string): Observable<IProduct> {
    return this.httpClient.get<IProduct>(
      `http://localhost:8085/products/${id}`
    )
  }

  getFileSize(path: string): Observable<number> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
    return this.httpClient
      .head(`${'http://localhost:8085/' + encodeURIComponent(path)}`, {
        headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const contentLength = response.headers.get('Content-Length')
          return contentLength ? +contentLength : 0
        })
      )
  }
}
