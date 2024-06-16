import { Component, OnInit, inject } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  private fb = inject(FormBuilder);
  public settingsService = inject(SettingsService);

  countries: any[] | undefined;
  sidebarVisible: boolean = false;
  formGroup: FormGroup = new FormGroup({});
  filteredCountries!: any[];

  ngOnInit() {
    this.formGroup = this.fb.group({
      selectedCountry: new FormControl('')
    });
  }

  filterCountry(event: AutoCompleteCompleteEvent) { }
}
