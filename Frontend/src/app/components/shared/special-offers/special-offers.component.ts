import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-special-offers',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './special-offers.component.html',
  styleUrl: './special-offers.component.scss'
})
export class SpecialOffersComponent {
  @Input() product_name: string | undefined;
  @Input() description: string | undefined;
  @Input() imgPath: string | undefined;

  constructor() {
  }

}
