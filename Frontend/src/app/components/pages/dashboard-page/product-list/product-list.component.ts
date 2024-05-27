import { Component } from '@angular/core';
import { ProductCardComponent } from '../../../shared/product-card/product-card.component';
import { CommonModule } from '@angular/common';
import { IProductPreview } from '../../../shared/product-card/interfaces/productPreview.interface';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  items: IProductPreview[] = [
    {
      title: 'Product 1',
      price: 100,
      size: 'M',
      placeOfOrigin: 'Hungary',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 2',
      price: 200,
      size: 'L',
      placeOfOrigin: 'Germany',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 3',
      price: 300,
      size: 'S',
      placeOfOrigin: 'France',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 1',
      price: 100,
      size: 'M',
      placeOfOrigin: 'Hungary',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 2',
      price: 200,
      size: 'L',
      placeOfOrigin: 'Germany',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 3',
      price: 300,
      size: 'S',
      placeOfOrigin: 'France',
      imagePath: 'assets/futoszonyeg.jpg'
    }, {
      title: 'Product 1',
      price: 100,
      size: 'M',
      placeOfOrigin: 'Hungary',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 2',
      price: 200,
      size: 'L',
      placeOfOrigin: 'Germany',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 3',
      price: 300,
      size: 'S',
      placeOfOrigin: 'France',
      imagePath: 'assets/futoszonyeg.jpg'
    }, {
      title: 'Product 1',
      price: 100,
      size: 'M',
      placeOfOrigin: 'Hungary',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 2',
      price: 200,
      size: 'L',
      placeOfOrigin: 'Germany',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 3',
      price: 300,
      size: 'S',
      placeOfOrigin: 'France',
      imagePath: 'assets/futoszonyeg.jpg'
    }, {
      title: 'Product 1',
      price: 100,
      size: 'M',
      placeOfOrigin: 'Hungary',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 2',
      price: 200,
      size: 'L',
      placeOfOrigin: 'Germany',
      imagePath: 'assets/futoszonyeg.jpg'
    },
    {
      title: 'Product 3',
      price: 300,
      size: 'S',
      placeOfOrigin: 'France',
      imagePath: 'assets/futoszonyeg.jpg'
    }

  ];

}
