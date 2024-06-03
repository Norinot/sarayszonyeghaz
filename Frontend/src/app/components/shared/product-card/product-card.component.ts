import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, inject } from '@angular/core';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MenuModule, ButtonModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent implements OnChanges {

  private productService = inject(ProductService)

  @Input() productId?: string
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

  removeProduct(id: string | undefined) {

    console.log(this.productId);


    if (this.productId != undefined) {
      this.productService.removeSelectedProduct(this.productId).subscribe(() => {
        console.log('Termék sikeresen törölve');
      },
        error => {
          console.log(error);
        }
      );
    } else {
      alert('Hiba történt a termék törlése közben');
    }
  }


  items: MenuItem[] = [
    {
      label: 'Módosítás',
      icon: 'pi pi-refresh',
      routerLink: ['/edit-product/${this.productId}'],
    },
    {
      label: 'Törlés',
      icon: 'pi pi-trash',
      command: () => {
        this.removeProduct(this.productId);
      }
    }
  ];
}
