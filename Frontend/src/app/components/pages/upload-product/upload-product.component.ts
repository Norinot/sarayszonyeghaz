import { CommonModule } from '@angular/common'
import { Component, OnInit, inject } from '@angular/core'
import {
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessagesModule } from 'primeng/messages'
import { InputNumberModule } from 'primeng/inputnumber'
import { FloatLabelModule } from 'primeng/floatlabel'
import { ProductCardComponent } from '../../shared/product-card/product-card.component'
import { FileUploadingComponent } from '../../shared/file-uploading/file-uploading.component'
import { fileUploadService } from '../../services/fileUploading/fileUpload.service'
import { ProductService } from '../../services/product.service'
import { IProduct } from '../../shared/product-card/interfaces/product.interface'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
    selector: 'app-upload-product',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        MessagesModule,
        CommonModule,
        InputNumberModule,
        FloatLabelModule,
        ProductCardComponent,
        FileUploadingComponent,
    ],
    templateUrl: './upload-product.component.html',
    styleUrl: './upload-product.component.scss',
})
export class UploadProductComponent implements OnInit {
    public fileUploadService = inject(fileUploadService)
    private productService = inject(ProductService)
    private router = inject(Router)
    private activatedRoute = inject(ActivatedRoute)

    private id: string = ''
    private product?: IProduct
    existingFiles: any[] = []

    productForm: FormGroup = (() => {
        const fb = inject(FormBuilder)
        return fb.group({
            name: [, Validators.required],
            size: [],
            material: [],
            color: [],
            design: [],
            origin: [],
            cleaning: [''],
            price: [, Validators.required],
        })
    })()

    getControl(name: string): FormControl {
        return this.productForm.get(name) as FormControl
    }

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.params['id']

        if (this.id) {
            this.productService.getSpecificProductById(this.id).subscribe({
                next: (response: IProduct) => {
                    this.productForm.patchValue(response)

                    if (
                        response.image_paths &&
                        response.image_paths.length > 0
                    ) {
                        response.image_paths.forEach((path: string) => {
                            const objectURL = `http://localhost:8085/${path}`

                            this.productService
                                .getFileSize(path)
                                .subscribe((size: number) => {
                                    this.existingFiles.push({
                                        name: path.split('/').pop(),
                                        objectURL,
                                        size,
                                    })
                                })
                        })
                    }
                },
                error: (error) => {
                    console.error('Error fetching product details:', error)
                    this.router.navigate(['/'])
                },
            })
        }
    }

    markAllAsDirty(formGroup: FormGroup): void {
        Object.values(formGroup.controls).forEach((control) => {
            control.markAsDirty()
            if (control instanceof FormGroup) {
                this.markAllAsDirty(control)
            }
        })
    }

    onSubmit(): void {
        const product = new FormData()
        product.append('name', this.getControl('name').value)
        product.append('size', this.getControl('size').value)
        product.append('material', this.getControl('material').value)
        product.append('color', this.getControl('color').value)
        product.append('design', this.getControl('design').value)
        product.append('origin', this.getControl('origin').value)
        product.append('cleaning', this.getControl('cleaning').value)
        product.append('price', this.getControl('price').value)

        this.fileUploadService.allFiles.forEach((file) => {
            product.append('files', file, file.name)
        })

        if (this.id != null) {
            this.productService
                .updateSelectedProduct(product, this.id)
                .subscribe(
                    () => {
                        console.log('Product updated')
                        console.log(this.productForm)
                    },
                    (error) => {
                        console.error(error)
                    }
                )
        } else if (this.productForm.valid) {
            this.productService.createNewProduct(product).subscribe(
                () => {
                    console.log('Product created')
                    console.log(this.productForm)
                },
                (error) => {
                    console.error(error)
                }
            )
        } else {
            this.markAllAsDirty(this.productForm)
        }
    }

    getFormControl(name: string): FormControl {
        return this.productForm.get(name) as FormControl
    }

    isInvalid(name: string): boolean {
        const control = this.getFormControl(name)
        return control.invalid && control.dirty
    }
}
