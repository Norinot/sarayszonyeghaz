import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router'
import { HeaderComponent } from './components/pages/header/header.component'
import { FooterComponent } from './components/pages/footer/footer.component'
import { SettingsService } from './components/services/settings.service'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { MenuItem } from 'primeng/api'
import { filter } from 'rxjs'

const routeLabels: { [key: string]: string } = {
  'admin': 'Admin',
  'upload-product': 'Termék feltöltés',
  '': 'Főoldal',
  'contact': 'Üzletünk elérhetőségei',
  'details': 'Termék részletek',
  'facilities': "Szolgáltatásaink"
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {

  private router = inject(Router)
  private settingsService = inject(SettingsService)

  home: MenuItem | undefined
  items: MenuItem[] | undefined

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin')
  }
  ngOnInit() {
    this.subscribeToRouteEvents()
    const expire = localStorage.getItem('expire')
    if (expire) {
      const expireDate = new Date(expire)
      const date = new Date()
      if (expireDate.getTime() < date.getTime()) {
        localStorage.removeItem('token')
      }
    }
    if (!this.settingsService.getUnused()) {
      this.router.navigate(['/contact'])
    }

    this.home = { icon: 'pi pi-home', routerLink: '/' }
  }


  private subscribeToRouteEvents(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const routePart = event.url.split('/')[1];
        const readableLabel = routeLabels[routePart] || this.transformRoutePart(routePart); //
        this.items = [{ label: readableLabel }];
      })
  }

  private transformRoutePart(routePart: string): string {
    return routePart
      .replace(/-/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
