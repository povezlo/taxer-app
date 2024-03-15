import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'certificate',
    loadChildren: () => import('./pages/certificate-page/certificate-page.routes').then(m => m.certificateRoutes),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
