import { Component } from '@angular/core';
import { SpecialOffersComponent } from '../../../shared/special-offers/special-offers.component';
import { ILiveSpecialOffers } from '../live-special-offers.interface';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-live-special-offers',
  standalone: true,
  imports: [SpecialOffersComponent],
  templateUrl: './live-special-offers.component.html',
  styleUrl: './live-special-offers.component.scss'
})
export class LiveSpecialOffersComponent {
  livespecialoffers: ILiveSpecialOffers[] = [
    {
      productName:'asd',
      description: 'asdad',
      imgPath: 'assets/LiveSpecialOffers_placeholder.jpg'
    },
    {
      productName:'2asd',
      description: '2asdad',
      imgPath: 'assets/LiveSpecialOffers_placeholder2.jpg'
    }
  ];
}
