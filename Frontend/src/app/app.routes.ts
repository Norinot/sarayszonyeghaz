import { Routes } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { defaultRouteGuard } from './guards/default-route.guard';

export const routes: Routes = [
  { path: 'admin', loadComponent: () => import('./components/pages/admin-page/admin-page.component').then(mod => mod.AdminPageComponent), },
  { path: '', component: DashboardPageComponent, canActivate: [defaultRouteGuard] },
  { path: 'contact', component: ContactComponent },
];
