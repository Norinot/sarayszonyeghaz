import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-card',
  standalone: true,
  imports: [],
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.scss'
})
export class CategoriesCardComponent {
  @Input() description: string | undefined;
  @Input() imgPath: string | undefined;

  constructor() {
  }
}
