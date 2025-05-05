import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="preview-card" *ngIf="user">
      <h2 class="preview-title">User Preview</h2>
      
      <div class="preview-row">
        <div class="preview-label">Name:</div>
        <div class="preview-value">{{ user.firstName }} {{ user.lastName }}</div>
      </div>
      
      <div class="preview-row">
        <div class="preview-label">Email:</div>
        <div class="preview-value">{{ user.email }}</div>
      </div>
      
      <div class="preview-row">
        <div class="preview-label">Age:</div>
        <div class="preview-value">{{ user.age }}</div>
      </div>
      
      <div class="preview-row">
        <div class="preview-label">Newsletter:</div>
        <div class="preview-value">{{ user.subscription ? 'Subscribed' : 'Not subscribed' }}</div>
      </div>
    </div>
  `,
  styles: []
})
export class UserPreviewComponent implements OnInit {
  user: User | null = null;
  
  constructor(private userService: UserService) {}
  
  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this.user = user;
    });
  }
}