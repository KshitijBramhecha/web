import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private initialUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    subscription: false
  };

  private userSubject = new BehaviorSubject<User>(this.initialUser);
  user$ = this.userSubject.asObservable();

  updateUser(user: User): void {
    this.userSubject.next(user);
  }

  resetUser(): void {
    this.userSubject.next(this.initialUser);
  }
}