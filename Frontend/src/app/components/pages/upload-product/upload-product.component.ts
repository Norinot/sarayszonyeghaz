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
import { ToastrService } from 'ngx-toastr'
import { DropdownModule } from 'primeng/dropdown'
import { ChipsModule } from 'primeng/chips'

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
        DropdownModule,
        ChipsModule,
    ],
    templateUrl: './upload-product.component.html',
    styleUrl: './upload-product.component.scss',
})
export class UploadProductComponent implements OnInit {
    public fileUploadService = inject(fileUploadService)
    private productService = inject(ProductService)
    private router = inject(Router)
    private activatedRoute = inject(ActivatedRoute)
    private toastr = inject(ToastrService)
    private id: string = ''
    private product?: IProduct
    existingFiles: any[] = []

    categories: any[] = [
        { name: 'Szőnyeg', code: 'Szőnyeg' },
        { name: 'Futószőnyeg', code: 'Futószőnyeg' },
        { name: 'Padlószőnyeg', code: 'Padlószőnyeg' },
        { name: 'Kiegészítő', code: 'Kiegészítő' },
        { name: 'Műfű', code: 'Műfű' },
    ]

    productForm: FormGroup = (() => {
        const fb = inject(FormBuilder)
        return fb.group({
            category: [, Validators.required],
            name: [, Validators.required],
            size: [[], Validators.required],
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
                next: async (response: IProduct) => {
                    this.productForm.patchValue(response)
                    if (response.image_paths) {
                        for (const path of response.image_paths) {
                            const objectURL = `http://localhost:8085/${path}`
                            try {
                                const response = await fetch(objectURL)
                                const imageBlob = await response.blob()
                                const fileName = path.split('/').pop()
                                if (fileName) {
                                    const file = new File(
                                        [imageBlob],
                                        fileName,
                                        {
                                            type: 'image/png',
                                        }
                                    )
                                    this.existingFiles.push(file)
                                }
                            } catch (error) {
                                this.toastr.error('Error fetching image')
                            }
                        }
                    }
                },
                error: (error) => {
                    this.toastr.error('Error fetching product')
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
        if (this.productForm.invalid) return
        const product = new FormData()
        product.append('category', this.getControl('category').value.code)
        product.append('name', this.getControl('name').value)
        product.append('size', JSON.stringify(this.getControl('size').value))
        product.append('material', this.getControl('material').value)
        product.append('color', this.getControl('color').value)
        product.append('design', this.getControl('design').value)
        product.append('origin', this.getControl('origin').value)
        product.append('cleaning', this.getControl('cleaning').value)
        product.append('price', this.getControl('price').value)

        this.fileUploadService.allFiles.forEach((file) => {
            const fileToUpload = file.file ? file.file : file
            product.append('files', fileToUpload, fileToUpload.name)
        })

        if (this.id != null) {
            this.productService
                .updateSelectedProduct(product, this.id)
                .subscribe({
                    next: () => {
                        this.toastr.success('Termék sikeresen frissítve!')
                        this.router.navigate(['/'])
                        console.log(product)
                    },
                    error: (error) => {
                        this.toastr.error(`Error updating product, ${error}`)
                    },
                })
        } else if (this.productForm.valid) {
            this.productService.createNewProduct(product).subscribe({
                next: () => {
                    this.toastr.success('Termék sikeresen hozzáadva!')
                    this.router.navigate(['/'])
                },
                error: (error) => {
                    this.toastr.error(`Error creating product, ${error}`)
                    console.log(product.forEach((item) => console.log(item)))
                },
            })
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
