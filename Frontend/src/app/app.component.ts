import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
    ActivatedRoute,
    NavigationEnd,
    Router,
    RouterOutlet,
} from '@angular/router'
import { HeaderComponent } from './components/pages/header/header.component'
import { FooterComponent } from './components/pages/footer/footer.component'
import { SettingsService } from './components/services/settings.service'
import { SidebarModule } from 'primeng/sidebar'
import { ButtonModule } from 'primeng/button'
import { LoginService } from './components/services/login.service'
import { BreadcrumbModule } from 'primeng/breadcrumb'
import { MenuItem } from 'primeng/api'
import { filter } from 'rxjs'

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
    title = 'Frontend2.0'

    private router = inject(Router)
    private settingsService = inject(SettingsService)
    private loginService = inject(LoginService)
    private activatedRoute = inject(ActivatedRoute)
    private uerel = ''

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
        const currentDate = new Date()
        if (!this.settingsService.getUnused()) {
            this.router.navigate(['/contact'])
        }

        this.home = { icon: 'pi pi-home', routerLink: '/' }
    }
    private subscribeToRouteEvents(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event: any) => {
                this.items = [{ label: event.url.split('/')[1] }]
            })
    }
}
