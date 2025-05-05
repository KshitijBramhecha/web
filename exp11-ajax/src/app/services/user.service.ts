import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ValidationResult } from '../models/validation-result.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  validateUser(userData: { username: string, email: string }): Observable<ValidationResult> {
    // Normally you would call a real API endpoint here
    // For demo purposes, we'll simulate an API call with mock validation
    
    // Simulating API call with a delay to demonstrate loading state
    return this.mockValidation(userData).pipe(
      delay(1500) // Simulate network delay
    );
  }

  private mockValidation(userData: { username: string, email: string }): Observable<ValidationResult> {
    // Simple mock validation logic
    const { username, email } = userData;
    
    // Check if email looks valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    
    // Check username requirements (min length 4, no spaces)
    const isUsernameValid = username.length >= 4 && !username.includes(' ');
    
    if (isEmailValid && isUsernameValid) {
      return of({
        isValid: true,
        message: `Validation successful! User "${username}" with email "${email}" is valid.`
      });
    } else {
      let message = 'Validation failed: ';
      if (!isUsernameValid) {
        message += 'Username must be at least 4 characters and contain no spaces. ';
      }
      if (!isEmailValid) {
        message += 'Email format is invalid. ';
      }
      
      return of({
        isValid: false,
        message: message.trim()
      });
    }
  }
}