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
  public productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.selectedCategory$.subscribe((category: string | null) => {
      this.productService.allProducts.filter((product: IProduct) => {
        if (category === null) {
          this.productService.filteredProducts = [];
        } else {
          this.productService.filteredProducts = this.productService.allProducts.filter(
            (product: IProduct) => product.category === category
          );
        }
      });
    });

    this.productService.getAllProducts().subscribe((data: IProduct[]) => {
      this.productService.allProducts = this.transformProductData(data);
      this.productService.filteredProducts = this.productService.allProducts;
    });
  }

  private transformProductData(data: IProduct[]) {
    return data.map(product => ({
      ...product,
      image_paths: product.image_paths?.map((path: string) => `http://localhost:8085/${path}`)
    }));
  }
}
