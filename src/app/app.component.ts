import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
    <nav class="nav" aria-label="Main navigation">
          <ul class="nav__list">
              <li class="nav__item">
                <a
                    class="nav__link"
                    role="button"
                    aria-pressed="false"
                    tabindex="0"
                    routerLink="/"
                    routerLinkActive="nav__link--active"
                    [routerLinkActiveOptions]="{ exact: true }"
                  > Home
                </a>
              </li>
              <li class="nav__item">
                <a
                    class="nav__link"
                    role="button"
                    aria-pressed="false"
                    tabindex="0"
                    routerLink="/certificate"
                    routerLinkActive="nav__link--active"
                  > Certificate
                </a>
              </li>
          </ul>
        </nav>
    </header>
    <main class="main" role="main content">
        <router-outlet></router-outlet>
    </main>
    <footer class="footer">
        <p class="footer__copyright">&copy; {{ year }} TaxerApp</p>
    </footer>
    `,
})
export class AppComponent {
  year = new Date().getFullYear();
}
