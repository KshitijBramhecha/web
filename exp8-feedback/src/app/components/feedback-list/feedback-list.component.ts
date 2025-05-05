import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="list-container">
      <h2>Recent Feedback</h2>
      <div class="feedback-list">
        <div *ngFor="let item of feedbackItems" class="feedback-item">
          <div class="feedback-header">
            <span class="name">{{ item.name }}</span>
            <span class="date">{{ item.date | date:'short' }}</span>
          </div>
          <p class="message">{{ item.message }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    .feedback-item {
      background: white;
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .feedback-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .name {
      font-weight: bold;
    }

    .date {
      color: #666;
    }

    .message {
      margin: 0;
      line-height: 1.5;
    }
  `]
})
export class FeedbackListComponent {
  feedbackItems: Feedback[] = [];

  constructor(private feedbackService: FeedbackService) {
    this.feedbackService.getFeedback().subscribe(feedback => {
      this.feedbackItems = feedback;
    });
  }
}