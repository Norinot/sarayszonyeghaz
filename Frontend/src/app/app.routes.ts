import { Routes } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { defaultRouteGuard } from './guards/default-route.guard';
import { adminGuard } from './guards/admin.guard';


export const routes: Routes = [
  { path: 'admin', loadComponent: () => import('./components/pages/admin-page/admin-page.component').then(mod => mod.AdminPageComponent), },
  { path: 'upload-product', loadComponent: () => import('./components/pages/upload-product/upload-product.component').then(mod => mod.UploadProductComponent), canActivate: [adminGuard] },
  { path: '', component: DashboardPageComponent, canActivate: [defaultRouteGuard] },
  { path: 'contact', component: ContactComponent },
  { path: 'details/:id', loadComponent: () => import('./components/pages/product-details-page/product-details-page.component').then(mod => mod.ProductDetailsPageComponent) },
  { path: 'upload-product/:id', loadComponent: () => import('./components/pages/upload-product/upload-product.component').then(mod => mod.UploadProductComponent) },
  { path: 'facilities', loadComponent: () => import('./components/pages/facilities/facilities.component').then(mod => mod.FacilitiesComponent) },
];
