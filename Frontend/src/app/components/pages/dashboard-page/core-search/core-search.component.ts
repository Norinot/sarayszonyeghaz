import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ProductService } from '../../../services/product.service';
import { IProduct } from '../../../shared/product-card/interfaces/product.interface';
import { debounceTime } from 'rxjs';
import { AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent } from 'primeng/autocomplete';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-core-search',
  standalone: true,
  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule, AutoCompleteModule, CommonModule, RouterModule],
  templateUrl: './core-search.component.html',
  styleUrl: './core-search.component.scss'
})
export class CoreSearchComponent implements OnInit {
  searchResults: any[] = [];
  searchInput: FormControl = new FormControl();

  private productListService = inject(ProductService);
  filteredProducts: any[] = [];



  ngOnInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredProducts = this.filterProducts(value);

      });
  }

  onSearch(event: AutoCompleteCompleteEvent): void {
    this.filteredProducts = this.filterProducts(event.query);
  }

  private filterProducts(searchValue: string): IProduct[] {
    if (!searchValue.trim()) {
      return this.productListService.allProducts || [];
    }

    const lowerSearchValue = searchValue.toLowerCase();

    return this.productListService.allProducts.filter((product: any) => {
      return Object.values(product).some(val =>
        String(val).toLowerCase().includes(lowerSearchValue)
      );
    });
  }


}
