import { Routes } from '@angular/router';
import { CertificatePageComponent } from './certificate-page.component';
export const certificateRoutes: Routes = [
  {
    path: '',
    component: CertificatePageComponent,
    children: [
      {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full'
      },
      {
        path: 'upload',
        loadComponent: () => import('./components/certificate-uploader/certificate-uploader.component').then(m => m.CertificateUploaderComponent)
      },
      {
        path: 'table',
        loadComponent: () => import('./components/certificate-table/certificate-table.component').then(m => m.CertificateTableComponent)
      }
    ]
  }
];
