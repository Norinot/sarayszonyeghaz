import { Component } from '@angular/core';
import { CategoriesContainerComponent } from './categories-container/categories-container.component';
import { CoreSearchComponent } from './core-search/core-search.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CategoriesContainerComponent, CoreSearchComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
