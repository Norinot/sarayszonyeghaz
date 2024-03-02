import { Component } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
