import { Component, OnInit, inject } from '@angular/core';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../shared/product-card/interfaces/product.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  items: IProduct[] = [];
  private productListService = inject(ProductService);

  ngOnInit(): void {
    this.productListService.getAllProducts().subscribe({
      next: (response: IProduct[]) => {
        this.items = this.transformProductData(response);
        this.productListService.allProducts = this.transformProductData(response);
        console.log(this.productListService.allProducts);

      },
      error: () => {
        this.items = [];
      }
    })
  }

  private transformProductData(data: IProduct[]) {
    return data.map(product => (
      {
        ...product,
        image_paths: product.image_paths?.map((path: string) => `http://localhost:8085/${path}`)
      }
    ))
  }

}
