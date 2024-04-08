import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-upload-product',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, MessagesModule, CommonModule],
  templateUrl: './upload-product.component.html',
  styleUrl: './upload-product.component.scss'
})
export class UploadProductComponent {

  productForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      size: [''],
      material: [''],
      color: [''],
      style: [''],
      origin: [''],
      cleaningInstructions: [''],
      price: ['', Validators.required],
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
