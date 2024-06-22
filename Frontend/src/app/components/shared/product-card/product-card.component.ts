import {
    Component,
    Input,
    OnChanges,
    SimpleChanges,
    inject,
} from '@angular/core'
import { MenuModule } from 'primeng/menu'
import { ButtonModule } from 'primeng/button'
import { MenuItem } from 'primeng/api'
import { CommonModule } from '@angular/common'
import { ProductService } from '../../services/product.service'
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { SettingsService } from '../../services/settings.service'

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [MenuModule, ButtonModule, CommonModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnChanges {
    private productService = inject(ProductService)
    private router = inject(Router)
    private toastrService = inject(ToastrService)
    public settingsService = inject(SettingsService)

    @Input() productId?: string
    @Input() productName?: string
    @Input() productSize?: string[]
    @Input() productPlaceOfOrigin?: string
    @Input() productImagePath?: string
    @Input() productPrice?: number

    private iProduct = inject(ProductService)

    ngOnChanges(changes: SimpleChanges) {
        if (
            changes['productName'] &&
            changes['productName'].currentValue === ''
        ) {
            this.productName = 'Példa cím'
        }
        if (
            changes['productSize'] &&
            changes['productSize'].currentValue === ''
        ) {
            this.productSize = ['Példa méret']
        }
        if (
            changes['productPlaceOfOrigin'] &&
            changes['productPlaceOfOrigin'].currentValue === ''
        ) {
            this.productPlaceOfOrigin = 'Példa hely'
        }
        if (
            changes['productImagePath'] &&
            changes['productImagePath'].currentValue === ''
        ) {
            this.productImagePath = 'https://via.placeholder.com/150'
        }
    }

    removeProduct(id: string | undefined) {
        if (id != undefined) {
            this.productService.removeSelectedProduct(id).subscribe({
                next: () => {
                    this.toastrService.success('Termék törölve!', 'Siker!')
                },
                error: () => {
                    this.toastrService.error(
                        'Hiba történt a termék törlése közben!',
                        'Hiba!'
                    )
                },
            })
        }
    }

    items: MenuItem[] = [
        {
            label: 'Módosítás',
            icon: 'pi pi-refresh',
            command: () => {
                this.router.navigate([`/upload-product/${this.productId}`])
            },
        },
        {
            label: 'Törlés',
            icon: 'pi pi-trash',
            command: () => {
                this.removeProduct(this.productId)
            },
        },
    ]
}
