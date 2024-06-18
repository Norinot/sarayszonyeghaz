import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/pages/header/header.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { SettingsService } from './components/services/settings.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { LoginService } from './components/services/login.service';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Frontend2.0';
  private router = inject(Router);
  private settingsService = inject(SettingsService);
  private activatedRoute = inject(Router)
  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }

  ngOnInit() {


    if (!this.settingsService.getUnused()) {
      this.router.navigate(['/contact']);
    }

    this.subscribeToRouteEvents();
  }

  private subscribeToRouteEvents(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentRoute = event.url;
    });
  }
}
