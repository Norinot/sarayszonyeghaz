import { Component, Input } from '@angular/core';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-categories-card',
  standalone: true,
  imports: [ChipModule, ButtonModule],
  templateUrl: './categories-card.component.html',
  styleUrl: './categories-card.component.scss'
})
export class CategoriesCardComponent {
  @Input() description: string | undefined;
  @Input() imgPath: string | undefined;

  constructor() {
  }
}
