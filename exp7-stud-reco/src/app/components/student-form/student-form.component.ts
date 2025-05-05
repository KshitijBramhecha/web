import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            [(ngModel)]="student.name"
            name="name"
            required
            class="input-field"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            [(ngModel)]="student.email"
            name="email"
            required
            class="input-field"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Grade</label>
          <select
            [(ngModel)]="student.grade"
            name="grade"
            required
            class="input-field"
          >
            <option value="A">A</option>
            <option value="B+">B+</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            [(ngModel)]="student.age"
            name="age"
            required
            class="input-field"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
          <select
            [(ngModel)]="student.gender"
            name="gender"
            required
            class="input-field"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Enrollment Date</label>
          <input
            type="date"
            [(ngModel)]="student.enrollmentDate"
            name="enrollmentDate"
            required
            class="input-field"
            [value]="student.enrollmentDate | date:'yyyy-MM-dd'"
          >
        </div>
        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          <div class="flex items-center space-x-4">
            <div class="flex-1">
              <input
                type="file"
                (change)="onFileSelected($event)"
                accept="image/*"
                class="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              >
            </div>
            @if (previewUrl) {
              <div class="flex-shrink-0">
                <img 
                  [src]="previewUrl" 
                  alt="Preview" 
                  class="w-16 h-16 rounded-full object-cover border-2 border-blue-200"
                >
              </div>
            }
          </div>
          <p class="mt-2 text-sm text-gray-500">Upload a profile picture (optional)</p>
        </div>
      </div>
      <div class="mt-6 flex justify-end">
        <button type="submit" class="btn btn-primary">
          {{ isEditMode ? 'Update Student' : 'Add Student' }}
        </button>
      </div>
    </form>
  `
})
export class StudentFormComponent {
  @Input() isEditMode = false;
  @Input() set editStudent(student: Student | null) {
    if (student) {
      this.student = { 
        ...student,
        enrollmentDate: new Date(student.enrollmentDate)
      };
      this.previewUrl = student.imageUrl;
    }
  }
  @Output() studentAdded = new EventEmitter<void>();
  @Output() studentUpdated = new EventEmitter<void>();

  student: Student = {
    name: '',
    email: '',
    grade: 'A',
    age: 18,
    enrollmentDate: new Date(),
    imageUrl: '',
    gender: 'Male',
    house: ''
  };

  previewUrl: string | null = null;

  constructor(private studentService: StudentService) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.previewUrl = e.target?.result as string;
        this.student.imageUrl = this.previewUrl;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.student);
      this.studentUpdated.emit();
    } else {
      this.studentService.addStudent({ ...this.student });
      this.resetForm();
      this.studentAdded.emit();
    }
  }

  private resetForm(): void {
    this.student = {
      name: '',
      email: '',
      grade: 'A',
      age: 18,
      enrollmentDate: new Date(),
      imageUrl: '',
      gender: 'Male',
      house: ''
    };
    this.previewUrl = null;
  }
}