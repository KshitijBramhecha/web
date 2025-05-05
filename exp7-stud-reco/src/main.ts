import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { StudentListComponent } from './app/components/student-list/student-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [StudentListComponent],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <nav class="sticky top-0 z-10">
        <div class="container mx-auto px-4 py-4">
          <h1 class="text-2xl font-bold text-indigo-600">Student Management System</h1>
        </div>
      </nav>
      <app-student-list></app-student-list>
    </div>
  `
})
export class App {}

bootstrapApplication(App)