import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="header">
      <div class="container header-container">
        <div class="logo">
          <h1>Feedback<span>System</span></h1>
        </div>
        <nav>
          <button class="nav-button" (click)="scrollTo('feedback-form')">
            Leave Feedback
          </button>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary-color);
      color: white;
      padding: var(--space-3) 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .logo h1 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 700;
    }
    
    .logo span {
      font-weight: 400;
      opacity: 0.9;
    }
    
    .nav-button {
      background-color: var(--accent-color);
      color: white;
      border: none;
      padding: var(--space-2) var(--space-3);
      border-radius: 4px;
      font-weight: 500;
      transition: all 0.2s ease;
    }
    
    .nav-button:hover {
      background-color: var(--accent-light);
      transform: translateY(-2px);
    }
    
    @media (max-width: 768px) {
      .header {
        padding: var(--space-2) 0;
      }
      
      .logo h1 {
        font-size: 1.25rem;
      }
    }
  `]
})
export class HeaderComponent {
  scrollTo(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}