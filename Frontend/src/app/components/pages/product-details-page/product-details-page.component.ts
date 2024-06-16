import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../../shared/product-card/interfaces/product.interface';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [GalleriaModule, ImageModule],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent implements OnInit {
  private productService = inject(ProductService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  public product?: IProduct;


  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.productService.getSpecificProductById(id).subscribe({
      next: (response: IProduct) => {
        this.product = response;
        console.log(this.product);
      },
      error: () => {
        this.router.navigate(['/']);
      }
    })
  }
}
