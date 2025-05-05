import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Submit Feedback</h2>
      <form [formGroup]="feedbackForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            id="name" 
            formControlName="name" 
            placeholder="Enter your name"
          >
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email" 
            placeholder="Enter your email"
          >
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea 
            id="message" 
            formControlName="message" 
            rows="4" 
            placeholder="Your feedback..."
          ></textarea>
        </div>

        <button type="submit" [disabled]="feedbackForm.invalid || submitting">
          {{ submitting ? 'Submitting...' : 'Submit' }}
        </button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 500px;
      margin: 20px auto;
      padding: 20px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input, textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    button {
      width: 100%;
      padding: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background: #ccc;
    }
  `]
})
export class FeedbackFormComponent {
  feedbackForm: FormGroup;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.feedbackForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) return;

    this.submitting = true;
    this.feedbackService.addFeedback(this.feedbackForm.value);
    
    setTimeout(() => {
      this.submitting = false;
      this.feedbackForm.reset();
    }, 500);
  }
}