import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../../services/feedback.service';
import { FeedbackStats } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="stats-section">
      <div class="container">
        <h2 class="section-title">Feedback Overview</h2>
        
        <div class="stats-grid">
          <div class="stat-card total-count">
            <div class="stat-value">{{ stats.totalCount }}</div>
            <div class="stat-label">Total Feedbacks</div>
          </div>
          
          <div class="stat-card average-rating">
            <div class="stat-value">{{ stats.averageRating | number:'1.1-1' }}</div>
            <div class="stat-label">Average Rating</div>
            <div class="rating-stars">
              <span *ngFor="let star of [1, 2, 3, 4, 5]" 
                [class.filled]="star <= Math.round(stats.averageRating)">★</span>
            </div>
          </div>
          
          <div class="stat-card distribution">
            <h3 class="distribution-title">Rating Distribution</h3>
            <div class="progress-bars">
              <div *ngFor="let star of [5, 4, 3, 2, 1]" class="progress-item">
                <div class="progress-label">{{ star }} <span class="star">★</span></div>
                <div class="progress-bar">
                  <div class="progress-fill" 
                    [style.width.%]="getPercentage(stats.ratingDistribution[star])"
                    [ngClass]="'rating-' + star">
                  </div>
                </div>
                <div class="progress-value">{{ stats.ratingDistribution[star] || 0 }}</div>
              </div>
            </div>
          </div>
          
          <div class="stat-card categories">
            <h3 class="distribution-title">Categories</h3>
            <div class="category-list">
              <div *ngFor="let category of getCategories()" class="category-item">
                <div class="category-name">{{ category | titlecase }}</div>
                <div class="category-count">{{ stats.categoryDistribution[category] || 0 }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stats-section {
      padding: var(--space-6) 0;
      background-color: var(--neutral-200);
    }
    
    .section-title {
      margin-bottom: var(--space-4);
      position: relative;
    }
    
    .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 60px;
      height: 4px;
      background-color: var(--primary-color);
      border-radius: 2px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--space-4);
    }
    
    .stat-card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: var(--space-4);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }
    
    .total-count {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .stat-value {
      font-size: 3rem;
      font-weight: 700;
      color: var(--primary-color);
      margin-bottom: var(--space-1);
    }
    
    .stat-label {
      color: var(--neutral-600);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .average-rating {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    .rating-stars {
      margin-top: var(--space-2);
      font-size: 1.5rem;
      color: var(--neutral-400);
    }
    
    .rating-stars .filled {
      color: var(--warning-color);
    }
    
    .distribution, .categories {
      grid-column: span 2;
    }
    
    .distribution-title {
      margin-bottom: var(--space-3);
      font-size: 1.25rem;
      color: var(--neutral-800);
    }
    
    .progress-bars {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
    
    .progress-item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }
    
    .progress-label {
      min-width: 40px;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    
    .progress-label .star {
      color: var(--warning-color);
      margin-left: 4px;
    }
    
    .progress-bar {
      flex-grow: 1;
      height: 12px;
      background-color: var(--neutral-200);
      border-radius: 6px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      border-radius: 6px;
      transition: width 0.5s ease-out;
    }
    
    .progress-fill.rating-5 {
      background-color: var(--success-color);
    }
    
    .progress-fill.rating-4 {
      background-color: var(--primary-color);
    }
    
    .progress-fill.rating-3 {
      background-color: var(--warning-color);
    }
    
    .progress-fill.rating-2 {
      background-color: var(--accent-color);
    }
    
    .progress-fill.rating-1 {
      background-color: var(--error-color);
    }
    
    .progress-value {
      min-width: 24px;
      text-align: right;
      font-weight: 500;
    }
    
    .category-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-3);
    }
    
    .category-item {
      display: flex;
      justify-content: space-between;
      padding: var(--space-2) var(--space-3);
      background-color: var(--neutral-200);
      border-radius: 4px;
      font-weight: 500;
    }
    
    .category-count {
      background-color: var(--primary-color);
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
    }
    
    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .distribution, .categories {
        grid-column: span 1;
      }
      
      .stat-value {
        font-size: 2.5rem;
      }
    }
  `]
})
export class FeedbackStatsComponent implements OnInit {
  stats: FeedbackStats = {
    totalCount: 0,
    averageRating: 0,
    ratingDistribution: {},
    categoryDistribution: {}
  };
  
  Math = Math; // To access Math in the template

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.updateStats();
    this.feedbackService.getFeedback().subscribe(() => {
      this.updateStats();
    });
  }

  updateStats(): void {
    this.stats = this.feedbackService.getStats();
  }

  getPercentage(count: number): number {
    if (!count || this.stats.totalCount === 0) return 0;
    return (count / this.stats.totalCount) * 100;
  }

  getCategories(): string[] {
    return Object.keys(this.stats.categoryDistribution);
  }
}