import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { FeedbackFormComponent } from './app/components/feedback-form/feedback-form.component';
import { FeedbackListComponent } from './app/components/feedback-list/feedback-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FeedbackFormComponent, FeedbackListComponent],
  template: `
    <div class="app-container">
      <h1>Feedback System</h1>
      <app-feedback-form></app-feedback-form>
      <app-feedback-list></app-feedback-list>
    </div>
  `,
  styles: [`
    .app-container {
      padding: 20px;
      background: #f5f5f5;
      min-height: 100vh;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  `]
})
export class App {}

bootstrapApplication(App);