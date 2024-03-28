import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/pages/header/header.component';
import { FooterComponent } from './components/pages/footer/footer.component';
import { SettingsService } from './components/services/settings.service';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'Frontend2.0';

  constructor(private router: Router, private settingsService: SettingsService) {
  }

  isAdminRoute(): boolean{
    return this.router.url.startsWith('/admin');
  }
  ngOnInit() {
    if(!this.settingsService.getUnused()){
      this.router.navigate(['/contact']);
    }
  }
}
