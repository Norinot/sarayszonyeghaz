import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SettingsService } from '../../services/settings.service';
import { SidebarModule } from 'primeng/sidebar';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule, AutoCompleteModule, ReactiveFormsModule, RouterModule, SidebarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  countries: any[] | undefined;
  sidebarVisible: boolean = false;
  formGroup: FormGroup;

  filteredCountries!: any[];

  constructor(private fb: FormBuilder, public settingsService: SettingsService) {
    this.formGroup = this.fb.group({
      selectedCountry: new FormControl('')
    });
  }

  ngOnInit() { }

  filterCountry(event: AutoCompleteCompleteEvent) { }
}
