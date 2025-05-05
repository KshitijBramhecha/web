import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <h2>User Information</h2>
      <form (ngSubmit)="onSubmit()" #userForm="ngForm">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName"
            [(ngModel)]="user.firstName"
            required
            #firstName="ngModel">
          <div *ngIf="firstName.invalid && firstName.touched" class="error">
            First name is required
          </div>
        </div>

        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName"
            [(ngModel)]="user.lastName"
            required
            #lastName="ngModel">
          <div *ngIf="lastName.invalid && lastName.touched" class="error">
            Last name is required
          </div>
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email"
            [(ngModel)]="user.email"
            required
            email
            #email="ngModel">
          <div *ngIf="email.invalid && email.touched" class="error">
            Valid email is required
          </div>
        </div>

        <div class="form-group">
          <label for="age">Age</label>
          <input 
            type="number" 
            id="age" 
            name="age"
            [(ngModel)]="user.age"
            required
            min="1"
            max="120"
            #age="ngModel">
          <div *ngIf="age.invalid && age.touched" class="error">
            Please enter a valid age (1-120)
          </div>
        </div>

        <div class="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="subscription" 
            name="subscription"
            [(ngModel)]="user.subscription">
          <label for="subscription">Subscribe to newsletter</label>
        </div>

        <div class="button-group">
          <button 
            type="submit" 
            [disabled]="userForm.invalid">
            Save
          </button>
          <button 
            type="button" 
            (click)="resetForm()">
            Reset
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      margin-bottom: 24px;
    }
    
    .error {
      color: #e53935;
      font-size: 14px;
      margin-top: 4px;
    }
    
    .button-group {
      display: flex;
      gap: 8px;
      margin-top: 16px;
    }
    
    button[type="button"] {
      background-color: #9e9e9e;
    }
    
    button[type="button"]:hover {
      background-color: #757575;
    }
  `]
})
export class UserFormComponent {
  user!: User;
  
  constructor(private userService: UserService) {
    this.userService.user$.subscribe(user => {
      this.user = {...user};
    });
  }
  
  onSubmit(): void {
    this.userService.updateUser({...this.user});
  }
  
  resetForm(): void {
    this.userService.resetUser();
  }
}