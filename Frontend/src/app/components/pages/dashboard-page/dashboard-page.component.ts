import { Component } from '@angular/core';
import { CategoriesContainerComponent } from './categories-container/categories-container.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CategoriesContainerComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
