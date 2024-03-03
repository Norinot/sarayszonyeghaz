import { Component } from '@angular/core';
import { CategoriesContainerComponent } from './categories-container/categories-container.component';
import { CoreSearchComponent } from './core-search/core-search.component';
import { SpecialOffersComponent } from '../../shared/special-offers/special-offers.component';
import { LiveSpecialOffersComponent } from './live-special-offers/live-special-offers.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CategoriesContainerComponent, CoreSearchComponent, SpecialOffersComponent, LiveSpecialOffersComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent {

}
