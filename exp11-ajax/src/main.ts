import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { UserValidationComponent } from './app/components/user-validation/user-validation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserValidationComponent],
  template: `
    <div class="app-container">
      <header>
        <h1>User Validation App</h1>
      </header>
      <main>
        <app-user-validation></app-user-validation>
      </main>
      <footer>
        <p>© 2025 User Validation</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 16px;
    }
    
    header {
      margin-bottom: 32px;
      text-align: center;
    }
    
    h1 {
      color: #4a80ff;
      font-weight: 500;
      margin: 0;
    }
    
    main {
      min-height: 60vh;
    }
    
    footer {
      margin-top: 48px;
      text-align: center;
      color: #888;
      font-size: 14px;
    }
  `]
})
export class App {
  name = 'User Validation';
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
});