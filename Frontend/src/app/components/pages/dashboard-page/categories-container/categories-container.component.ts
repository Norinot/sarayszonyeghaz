import { Component } from '@angular/core';
import { CategoriesCardComponent } from '../categories-card/categories-card.component';
import { ICategory } from '../category.interface';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-categories-container',
  standalone: true,
  imports: [CategoriesCardComponent, ProductListComponent],
  templateUrl: './categories-container.component.html',
  styleUrl: './categories-container.component.scss'
})
export class CategoriesContainerComponent {
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
    }
  ];
}
