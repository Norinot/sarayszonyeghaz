import { Routes } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { ContactComponent } from './components/pages/contact/contact.component';

export const routes: Routes = [
  {path: '', component: DashboardPageComponent},
  {path: 'contact', component: ContactComponent},
];
