import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private houses = [
    '💛 Gir Lions 🦁',
    '💙 Hemis Snow Leopards 🐆',
    '❤️ Kanha Tigers 🐯',
    '💚 Kaziranga Rhinos 🦏'
  ];

  private students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      grade: 'A',
      age: 20,
      enrollmentDate: new Date('2023-09-01'),
      imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=John&backgroundColor=b6e3f4,c0aede,d1d4f9&backgroundType=gradientLinear',
      gender: 'Male',
      house: '💛 Gir Lions 🦁'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      grade: 'B+',
      age: 19,
      enrollmentDate: new Date('2023-09-01'),
      imageUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Jane&backgroundColor=ffdfbf,ffd5dc,ffd6ff&backgroundType=gradientLinear',
      gender: 'Female',
      house: '❤️ Kanha Tigers 🐯'
    }
  ];

  private studentsSubject = new BehaviorSubject<Student[]>(this.students);

  getStudents(): Observable<Student[]> {
    return this.studentsSubject.asObservable();
  }

  addStudent(student: Student): void {
    const newStudent = {
      ...student,
      id: this.students.length + 1,
      imageUrl: student.imageUrl || this.generateAvatarUrl(student.name, student.gender),
      house: this.getRandomHouse()
    };
    this.students.push(newStudent);
    this.studentsSubject.next([...this.students]);
  }

  updateStudent(updatedStudent: Student): void {
    const index = this.students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      // Preserve the house and update other fields
      const house = this.students[index].house;
      this.students[index] = {
        ...updatedStudent,
        house,
        imageUrl: updatedStudent.imageUrl || this.generateAvatarUrl(updatedStudent.name, updatedStudent.gender)
      };
      this.studentsSubject.next([...this.students]);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(student => student.id !== id);
    this.studentsSubject.next(this.students);
  }

  private getRandomHouse(): string {
    const randomIndex = Math.floor(Math.random() * this.houses.length);
    return this.houses[randomIndex];
  }

  private generateAvatarUrl(name: string, gender: 'Male' | 'Female'): string {
    const backgroundColor = gender === 'Male' 
      ? 'b6e3f4,c0aede,d1d4f9' // Blue gradient for male
      : 'ffdfbf,ffd5dc,ffd6ff'; // Pink gradient for female
    
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}&backgroundColor=${backgroundColor}&backgroundType=gradientLinear`;
  }
}