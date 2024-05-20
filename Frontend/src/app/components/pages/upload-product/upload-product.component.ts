import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { FileUploadingComponent } from '../../shared/file-uploading/file-uploading.component';
import { IProductPreview } from '../../shared/product-card/interfaces/productPreview.interface';
import { fileUploadService } from '../../services/fileUploading/fileUpload.service';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, MessagesModule, CommonModule, InputNumberModule, FloatLabelModule, ProductCardComponent, FileUploadingComponent],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.scss'
})
export class UploadProductComponent implements OnInit {

  public fileUploadService = inject(fileUploadService);

  productForm: FormGroup = (() => {
    const fb = inject(FormBuilder);
    return fb.group({
      name: [, Validators.required],
      size: [],
      material: [],
      color: [],
      style: [],
      origin: [],
      cleaningInstructions: [''],
      price: [, Validators.required],
    });
  })();

  getControl(name: string): FormControl {
    return this.productForm.get(name) as FormControl;
  }

  ngOnInit(): void {
    this.getControl('name').valueChanges.subscribe(value => {
      console.log(value);

    });
  }


  markAllAsDirty(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsDirty();
      if (control instanceof FormGroup) {
        this.markAllAsDirty(control);
      }
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {

    } else {
      this.markAllAsDirty(this.productForm);
    }
  }

  getFormControl(name: string): FormControl {
    return this.productForm.get(name) as FormControl;
  }

  isInvalid(name: string): boolean {
    const control = this.getFormControl(name);
    return control.invalid && control.dirty;
  }
}
