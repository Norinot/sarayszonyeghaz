import { Component, LOCALE_ID, OnInit, inject } from '@angular/core'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router'
import { IProduct } from '../../shared/product-card/interfaces/product.interface'
import { GalleriaModule } from 'primeng/galleria'
import { ImageModule } from 'primeng/image'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    GalleriaModule,
    ImageModule,
    CommonModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
})
export class ProductDetailsPageComponent implements OnInit {
  private productService = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)

  public product?: IProduct

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ]

  displayBasic: any[] = [
    {
      breakpoint: '1024px',
    },
  ]

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    this.productService.getSpecificProductById(id).subscribe({
      next: (response: IProduct) => {
        this.product = response
        if (this.product.image_paths) {
          this.product.image_paths = this.product.image_paths.map(
            (path: string) => `http://localhost:8085/${path}`
          )
        }
      },
      error: () => {
        this.router.navigate(['/'])
      },
    })
  }
}
