import { Component } from '@angular/core';
import { MapComponent } from '../../shared/map/map.component';
import { MessageUsComponent } from '../../shared/message-us/message-us.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MapComponent, MessageUsComponent, ContactInfoComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

}
