import { Component } from '@angular/core';
import { CategoriesCardComponent } from '../categories-card/categories-card.component';
import { Category } from '../category.interface';

@Component({
  selector: 'app-categories-container',
  standalone: true,
  imports: [CategoriesCardComponent],
  templateUrl: './categories-container.component.html',
  styleUrl: './categories-container.component.scss'
})
export class CategoriesContainerComponent {
  categories: Category[] = [
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
