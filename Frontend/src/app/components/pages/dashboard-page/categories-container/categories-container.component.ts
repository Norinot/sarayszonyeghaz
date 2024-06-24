import { Component, inject } from '@angular/core';
import { CategoriesCardComponent } from '../categories-card/categories-card.component';
import { ICategory } from '../category.interface';
import { ProductListComponent } from '../product-list/product-list.component';
import { ProductService } from '../../../services/product.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-container',
  standalone: true,
  imports: [CategoriesCardComponent, ProductListComponent, ButtonModule, CommonModule],
  templateUrl: './categories-container.component.html',
  styleUrl: './categories-container.component.scss'
})
export class CategoriesContainerComponent {

  public productService = inject(ProductService)

  categories: ICategory[] = [
    {
      description: 'Szőnyeg',
      imgPath: 'assets/szonyeg.jpg'
    },
    {
      description: 'Futószőnyeg',
      imgPath: 'assets/futoszonyeg.jpg'
    },
    {
      description: 'Padlószőnyeg',
      imgPath: 'assets/padloszonyeg.jpg'
    },
    {
      description: 'Kiegészítők',
      imgPath: 'assets/kiegeszito.jpg'
    },
    {
      description: 'Műfű',
      imgPath: 'assets/mufu.jpg'
    }
  ];

  filterByCategory(category: any) {
    this.productService.selectCategory(category);
  }

  removeFilters() {
    this.productService.resetCategory();
    this.productService.filteredProducts = this.productService.allProducts;
  }
}
