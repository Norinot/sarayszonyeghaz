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
   
    if (window.innerHeight < 576) {
      mapContainer.style.height = '424px';
    } 
    else {
      mapContainer.style.height = '169px'; //Default height
    }
    if (window.innerWidth < 576) {
      mapContainer.style.width = '424px';
    } 
    else {
      mapContainer.style.width = '533px'; //Default width
    }

    const map = L.map(mapContainer).setView(this.coordinates, 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    L.marker(this.coordinates).addTo(map).bindPopup('Saray Szönyegház').openPopup();

    window.addEventListener('resize', () => {
      if (window.innerWidth < 576) {
        mapContainer.style.width = '424px';
        mapContainer.style.height = '424px';
      } 
      else {
        mapContainer.style.width = '533px';
        mapContainer.style.height = '169px';
      }
    })
  }

}
