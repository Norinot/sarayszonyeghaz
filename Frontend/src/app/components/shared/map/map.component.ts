import { AfterViewInit, Component, ElementRef } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {

  map!: L.Map;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
      window.dispatchEvent(new Event('resize'));
    }, 100);
  }
  coordinates: L.LatLngExpression = [47.5415300, 21.6071800]
  private initMap(): void {
    const mapContainer = this.elementRef.nativeElement.querySelector('#map');

    const map = L.map(mapContainer).setView(this.coordinates, 20);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker(this.coordinates).addTo(map).bindPopup('Saray Szönyegház').openPopup();

    mapContainer.style.height = '300px';
    mapContainer.style.width = '600px';
  }

}
