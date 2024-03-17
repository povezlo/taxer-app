import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <router-outlet></router-outlet>
  `,
})
export class CertificatePageComponent {}
