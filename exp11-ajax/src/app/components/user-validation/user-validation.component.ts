import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ValidationResult } from '../../models/validation-result.model';

@Component({
  selector: 'app-user-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="validation-container">
      <h2>User Validation</h2>
      
      <form [formGroup]="userForm" (ngSubmit)="validateUser()">
        <div class="form-field">
          <label for="username">Username</label>
          <input 
            type="text" 
            id="username" 
            formControlName="username"
            [class.error]="isFieldInvalid('username')"
          >
          <div class="error-message" *ngIf="isFieldInvalid('username')">
            Username is required
          </div>
        </div>
        
        <div class="form-field">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            formControlName="email"
            [class.error]="isFieldInvalid('email')"
          >
          <div class="error-message" *ngIf="isFieldInvalid('email')">
            Valid email is required
          </div>
        </div>
        
        <button 
          type="submit" 
          [disabled]="userForm.invalid || isLoading"
          [class.loading]="isLoading"
        >
          <span *ngIf="!isLoading">Validate User</span>
          <span *ngIf="isLoading">Validating...</span>
        </button>
      </form>
      
      <div class="results-container" *ngIf="validationResult">
        <div 
          class="result" 
          [class.success]="validationResult.isValid" 
          [class.error]="!validationResult.isValid"
        >
          <h3>Validation Result</h3>
          <p>{{ validationResult.message }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .validation-container {
      max-width: 400px;
      margin: 0 auto;
      padding: 24px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    h2 {
      margin-top: 0;
      margin-bottom: 24px;
      color: #333;
      font-weight: 500;
    }
    
    .form-field {
      margin-bottom: 16px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }
    
    input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    
    input:focus {
      outline: none;
      border-color: #4a80ff;
      box-shadow: 0 0 0 2px rgba(74, 128, 255, 0.2);
    }
    
    input.error {
      border-color: #f44336;
    }
    
    .error-message {
      margin-top: 4px;
      color: #f44336;
      font-size: 14px;
    }
    
    button {
      display: block;
      width: 100%;
      padding: 12px;
      background-color: #4a80ff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    button:hover {
      background-color: #3a70ee;
    }
    
    button:disabled {
      background-color: #a0a0a0;
      cursor: not-allowed;
    }
    
    button.loading {
      position: relative;
      background-color: #3a70ee;
    }
    
    .results-container {
      margin-top: 24px;
      animation: fadeIn 0.3s ease-in-out;
    }
    
    .result {
      padding: 16px;
      border-radius: 4px;
    }
    
    .result.success {
      background-color: rgba(76, 175, 80, 0.1);
      border-left: 4px solid #4caf50;
    }
    
    .result.error {
      background-color: rgba(244, 67, 54, 0.1);
      border-left: 4px solid #f44336;
    }
    
    .result h3 {
      margin-top: 0;
      margin-bottom: 8px;
      font-weight: 500;
    }
    
    .result p {
      margin: 0;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class UserValidationComponent {
  userForm: FormGroup;
  isLoading = false;
  validationResult: ValidationResult | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.userForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  validateUser(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.validationResult = null;
      
      this.userService.validateUser(this.userForm.value)
        .subscribe({
          next: (result) => {
            this.validationResult = result;
            this.isLoading = false;
          },
          error: (error) => {
            this.validationResult = {
              isValid: false,
              message: 'Validation failed: ' + (error.message || 'Unknown error')
            };
            this.isLoading = false;
          }
        });
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}