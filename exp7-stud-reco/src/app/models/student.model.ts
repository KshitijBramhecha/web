export interface Student {
  id?: number;
  name: string;
  email: string;
  grade: string;
  age: number;
  enrollmentDate: Date;
  imageUrl: string;
  gender: 'Male' | 'Female';
  house: string;
}