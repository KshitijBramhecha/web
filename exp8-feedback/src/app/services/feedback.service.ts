import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackItems: Feedback[] = [];
  private feedbackSubject = new BehaviorSubject<Feedback[]>(this.feedbackItems);

  getFeedback(): Observable<Feedback[]> {
    return this.feedbackSubject.asObservable();
  }

  addFeedback(feedback: Omit<Feedback, 'id' | 'date'>): void {
    const newFeedback: Feedback = {
      ...feedback,
      id: this.getNextId(),
      date: new Date()
    };
    
    this.feedbackItems = [newFeedback, ...this.feedbackItems];
    this.feedbackSubject.next(this.feedbackItems);
  }

  private getNextId(): number {
    return Math.max(0, ...this.feedbackItems.map(item => item.id)) + 1;
  }
}