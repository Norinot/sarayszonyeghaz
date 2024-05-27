import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { IProductPreview } from './interfaces/productPreview.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MenuModule, ButtonModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnChanges {

  @Input() productName?: string
  @Input() productSize?: string
  @Input() productPlaceOfOrigin?: string
  @Input() productImagePath?: string
  @Input() productPrice?: number

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productName'] && changes['productName'].currentValue === "") {
      console.log('productName is null');
      this.productName = 'Példa cím';
    }
    if (changes['productSize'] && changes['productSize'].currentValue === "") {
      this.productSize = 'Példa méret';
    }
    if (changes['productPlaceOfOrigin'] && changes['productPlaceOfOrigin'].currentValue === "") {
      this.productPlaceOfOrigin = 'Példa hely';
    }
    if (changes['productImagePath'] && changes['productImagePath'].currentValue === "") {
      this.productImagePath = 'https://via.placeholder.com/150';
    }
  }


  items: MenuItem[] = [
    {
      label: 'Módosítás',
      icon: 'pi pi-refresh'
    },
    {
      label: 'Törlés',
      icon: 'pi pi-trash'
    }
  ];
}
