import { Component, inject } from '@angular/core'
import { ButtonModule } from 'primeng/button'
import {
  AutoCompleteModule,
} from 'primeng/autocomplete'
import {
  ReactiveFormsModule,
} from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { SettingsService } from '../../services/settings.service'
import { SidebarModule } from 'primeng/sidebar'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public settingsService = inject(SettingsService)
  private router = inject(Router)
  countries: any[] | undefined
  sidebarVisible: boolean = false

  closeSidebar(route: string) {
    this.router.navigate([route])
    this.sidebarVisible = false
  }
}
