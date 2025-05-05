import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="feedback-item card" [ngClass]="'rating-' + feedback.rating">
      <div class="feedback-header">
        <div class="rating">
          <span class="stars">
            <span *ngFor="let star of getStars()" [class.filled]="star <= feedback.rating">★</span>
          </span>
          <span class="category-badge">{{ feedback.category | titlecase }}</span>
        </div>
        <div class="date">{{ feedback.date | date:'mediumDate' }}</div>
      </div>
      
      <div class="feedback-body">
        <p class="comment">{{ feedback.comment }}</p>
      </div>
      
      <div class="feedback-footer">
        <div class="user-info">
          <div class="avatar">{{ getInitials() }}</div>
          <div class="user-name">{{ feedback.name }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .feedback-item {
      height: 100%;
      display: flex;
      flex-direction: column;
      transition: all 0.3s ease;
      border-radius: 8px;
      overflow: hidden;
      border-top: 4px solid var(--neutral-400);
    }
    
    .feedback-item.rating-5 {
      border-top-color: var(--success-color);
    }
    
    .feedback-item.rating-4 {
      border-top-color: var(--primary-color);
    }
    
    .feedback-item.rating-3 {
      border-top-color: var(--warning-color);
    }
    
    .feedback-item.rating-2, .feedback-item.rating-1 {
      border-top-color: var(--error-color);
    }
    
    .feedback-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--space-3);
    }
    
    .rating {
      display: flex;
      flex-direction: column;
    }
    
    .stars {
      font-size: 1.25rem;
      color: var(--neutral-400);
      margin-bottom: var(--space-1);
    }
    
    .stars .filled {
      color: var(--warning-color);
    }
    
    .category-badge {
      display: inline-block;
      background-color: var(--primary-light);
      color: white;
      padding: var(--space-1) var(--space-2);
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .date {
      font-size: 0.875rem;
      color: var(--neutral-600);
    }
    
    .feedback-body {
      flex-grow: 1;
      margin-bottom: var(--space-3);
    }
    
    .comment {
      line-height: 1.6;
      color: var(--neutral-800);
    }
    
    .feedback-footer {
      border-top: 1px solid var(--neutral-300);
      padding-top: var(--space-3);
    }
    
    .user-info {
      display: flex;
      align-items: center;
    }
    
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: var(--space-2);
    }
    
    .user-name {
      font-weight: 500;
    }
    
    @media (max-width: 768px) {
      .stars {
        font-size: 1rem;
      }
    }
  `]
})
export class FeedbackItemComponent {
  @Input() feedback!: Feedback;

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getInitials(): string {
    if (!this.feedback.name) return '';
    
    return this.feedback.name
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}