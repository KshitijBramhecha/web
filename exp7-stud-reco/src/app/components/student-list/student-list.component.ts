import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentService } from '../../services/student.service';
import { Student } from '../../models/student.model';
import { StudentFormComponent } from '../student-form/student-form.component';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, StudentFormComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Students Record</h1>
        <button (click)="showAddForm()" class="btn btn-primary">
          Add Student
        </button>
      </div>

      <!-- Modal Overlay -->
      @if (showForm) {
        <div class="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
          <div class="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl w-full max-w-2xl mx-4 z-50 relative">
            <div class="flex justify-between items-center p-6 border-b border-gray-100">
              <h2 class="text-2xl font-semibold text-gray-800">
                {{ selectedStudent ? 'Update Student' : 'Add New Student' }}
              </h2>
              <button 
                (click)="closeForm()" 
                class="text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="p-6">
              <app-student-form
                [isEditMode]="!!selectedStudent"
                [editStudent]="selectedStudent"
                (studentAdded)="onStudentAdded()"
                (studentUpdated)="onStudentUpdated()"
              ></app-student-form>
            </div>
          </div>
        </div>
      }

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        @for (student of students$ | async; track student.id) {
          <div class="card">
            <div class="flex flex-col items-center mb-4">
              <div class="relative">
                <img 
                  [src]="student.imageUrl" 
                  [alt]="student.name"
                  class="w-32 h-32 rounded-full mb-4 border-4 shadow-md"
                  [class]="getHouseBorderColor(student.house)"
                >
                <span class="absolute bottom-6 right-0 bg-white rounded-full p-1 shadow-md">
                  {{ student.gender === 'Male' ? '👨' : '👩' }}
                </span>
              </div>
              <div class="text-center">
                <h3 class="text-xl font-semibold text-gray-800">{{ student.name }}</h3>
                <p class="text-gray-600">{{ student.email }}</p>
                <p class="text-lg font-medium mt-2">{{ student.house }}</p>
              </div>
            </div>
            <div class="flex justify-between items-center mt-4">
              <div>
                <p class="text-gray-600">Age: {{ student.age }}</p>
                <p class="text-gray-600">Enrolled: {{ student.enrollmentDate | date:'mediumDate' }}</p>
              </div>
              <span class="inline-block px-3 py-1 text-sm rounded-full"
                [class]="getGradeClass(student.grade)">
                Grade: {{ student.grade }}
              </span>
            </div>
            <div class="mt-4 flex justify-end space-x-4">
              <button
                (click)="editStudent(student)"
                class="text-indigo-500 hover:text-indigo-700 transition-colors duration-200"
              >
                Edit
              </button>
              <button
                (click)="deleteStudent(student.id!)"
                class="text-red-500 hover:text-red-700 transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class StudentListComponent implements OnInit {
  students$ = this.studentService.getStudents();
  showForm = false;
  selectedStudent: Student | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {}

  showAddForm(): void {
    this.selectedStudent = null;
    this.showForm = true;
  }

  editStudent(student: Student): void {
    this.selectedStudent = student;
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.selectedStudent = null;
  }

  onStudentAdded(): void {
    this.closeForm();
  }

  onStudentUpdated(): void {
    this.closeForm();
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
  }

  getGradeClass(grade: string): string {
    const baseClasses = 'bg-opacity-20 text-opacity-100';
    switch(grade) {
      case 'A':
        return `bg-green-500 text-green-700 ${baseClasses}`;
      case 'B+':
      case 'B':
        return `bg-blue-500 text-blue-700 ${baseClasses}`;
      case 'C':
        return `bg-yellow-500 text-yellow-700 ${baseClasses}`;
      default:
        return `bg-gray-500 text-gray-700 ${baseClasses}`;
    }
  }

  getHouseBorderColor(house: string): string {
    if (house.includes('💛')) return 'border-yellow-400';
    if (house.includes('💙')) return 'border-blue-400';
    if (house.includes('❤️')) return 'border-red-400';
    if (house.includes('💚')) return 'border-green-400';
    return 'border-gray-200';
  }
}