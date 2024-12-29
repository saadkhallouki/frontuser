import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <a class="navbar-brand" routerLink="/">
          <i class="fas fa-utensils"></i> GourmetTable
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/" routerLinkActive="active" 
                 [routerLinkActiveOptions]="{exact: true}">
                <i class="fas fa-home"></i> Accueil
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <i class="fas fa-utensils"></i> GourmetTable
          </div>
          <div class="footer-links">
            <a href="#">À propos</a>
            <a href="#">Contact</a>
            <a href="#">Mentions légales</a>
          </div>
          <div class="footer-social">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 GourmetTable - Tous droits réservés</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .navbar {
      background: linear-gradient(135deg, #ff6b6b 0%, #ffd93d 100%);
      padding: 1rem 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .navbar-brand {
      font-size: 1.5rem;
      font-weight: 700;
      color: white;
      transition: transform 0.3s ease;
    }

    .navbar-brand:hover {
      transform: translateY(-2px);
      color: white;
    }

    .nav-link {
      color: white !important;
      font-weight: 500;
      padding: 0.5rem 1rem;
      margin: 0 0.2rem;
      border-radius: 25px;
      transition: all 0.3s ease;
    }

    .nav-link:hover, .nav-link.active {
      background: rgba(255,255,255,0.2);
    }

    main {
      flex: 1;
    }

    .footer {
      background: #2d3436;
      color: white;
      padding: 3rem 0 1.5rem;
    }

    .footer-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-brand {
      font-size: 1.5rem;
      font-weight: 700;
    }

    .footer-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer-links a {
      color: #dfe6e9;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .footer-links a:hover {
      color: #ff6b6b;
    }

    .footer-social {
      display: flex;
      gap: 1rem;
    }

    .footer-social a {
      color: white;
      font-size: 1.5rem;
      transition: transform 0.3s ease;
    }

    .footer-social a:hover {
      transform: translateY(-3px);
      color: #ff6b6b;
    }

    .footer-bottom {
      padding-top: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
      text-align: center;
      color: #b2bec3;
    }

    @media (max-width: 768px) {
      .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .footer-social {
        justify-content: center;
      }
    }
  `]
})
export class AppComponent {
  title = 'restaurant-user';
}