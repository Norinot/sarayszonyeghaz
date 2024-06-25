import { ChangeDetectorRef, Component, LOCALE_ID, OnChanges, OnInit, inject } from '@angular/core'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { IProduct } from '../../shared/product-card/interfaces/product.interface'
import { GalleriaModule } from 'primeng/galleria'
import { ImageModule } from 'primeng/image'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ButtonModule } from 'primeng/button'
import { CarouselModule } from 'primeng/carousel';
import { ProductCardComponent } from '../../shared/product-card/product-card.component'
import { ToastrService } from 'ngx-toastr'
import { Observable, filter, of, switchMap, tap } from 'rxjs'

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    GalleriaModule,
    ImageModule,
    CommonModule,
    ButtonModule,
    RouterModule,
    CarouselModule,
    ProductCardComponent
  ],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss',
})
export class ProductDetailsPageComponent implements OnInit {
  private productService = inject(ProductService)
  private activatedRoute = inject(ActivatedRoute)
  private router = inject(Router)
  private toastrSerivice = inject(ToastrService)

  product?: IProduct
  allProducts: IProduct[] = []

  constructor() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
  }

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
    this.loadProductDetails().pipe(
      switchMap(() => {
        this.allProducts = this.productService.allProducts.filter(
          (product: IProduct) => product.product_id !== this.product?.product_id && product.category === this.product?.category
        );
        if (this.allProducts.length === 0) {
          return this.productService.getAllProducts().pipe(
            tap((response: IProduct[]) => {
              this.allProducts = this.transformProductData(response).filter(
                (product: IProduct) => product.product_id !== this.product?.product_id && product.category === this.product?.category
              );
            })
          );
        } else {
          return of([]);
        }
      })
    ).subscribe({
      error: () => {
        this.toastrSerivice.error('Hiba történt a termék betöltése közben!', 'Hiba!');
        this.router.navigate(['/']);
      },
    });
    this.allProducts = this.productService.allProducts
    if (this.allProducts.length === 0) {
      this.productService.getAllProducts().subscribe({
        next: (response: IProduct[]) => {
          this.allProducts = this.transformProductData(response);
        },
        error: () => {
          this.toastrSerivice.error('Hiba történt a termék betöltése közben!', 'Hiba!')
          this.router.navigate(['/'])
        },
      })
    }
  }


  private loadProductDetails(): Observable<IProduct> {
    const id = this.activatedRoute.snapshot.params['id'];
    return this.productService.getSpecificProductById(id).pipe(
      tap({
        next: (response: IProduct) => {
          this.product = response;
          if (this.product.image_paths) {
            this.product.image_paths = this.product.image_paths.map(
              (path: string) => `http://localhost:8085/${path}`
            );
          }
        },
        error: () => {
          this.toastrSerivice.error('Hiba történt a termék betöltése közben!', 'Hiba!');
          this.router.navigate(['/']);
        },
      })
    );
  }

  private transformProductData(data: IProduct[]) {
    return data.map(product => (
      {
        ...product,
        image_paths: product.image_paths?.map((path: string) => `http://localhost:8085/${path}`)
      }
    ))
  }
}
