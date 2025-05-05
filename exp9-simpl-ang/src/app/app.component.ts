import { Component } from '@angular/core';
import { UserFormComponent } from './components/user-form.component';
import { UserPreviewComponent } from './components/user-preview.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserFormComponent, UserPreviewComponent],
  template: `
    <div class="container">
      <h1>Angular Data Binding Demo</h1>
      <p>Enter your information below and see it update in real-time</p>
      
      <app-user-form></app-user-form>
      <app-user-preview></app-user-preview>
    </div>
  `,
  styles: [`
    h1 {
      color: #3367d6;
    }
    
    p {
      margin-bottom: 24px;
      color: #5f6368;
    }
  `]
})
export class AppComponent {}