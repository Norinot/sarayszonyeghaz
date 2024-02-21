import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, AutoCompleteModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  countries: any[] | undefined;

  formGroup: FormGroup;

  filteredCountries!: any[];

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      selectedCountry: new FormControl('')
    });
  }

  ngOnInit() {}

  filterCountry(event: AutoCompleteCompleteEvent) {}
}
