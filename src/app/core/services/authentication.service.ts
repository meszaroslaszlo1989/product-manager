import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/users';
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // Register
  register(user: User) {
    return this.http.post<User>(this.apiUrl, user).subscribe({
      next: (data) => {
        console.log('User created', data);
        this.router.navigate(['/login']);
      }
    });
  }

  // Login 
  login(username: string, password: string) {
    return this.http.get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          const user: User = data[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.router.navigate(['/products']);
        } else {
          this.notificationService.unsuccess('Hibás felhasználónév vagy jelszó!');
        }
      }
    });
  }

  // Logout
  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('pageSize');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  getUser(): User | null {
    return this.currentUserSubject.value;
  }

}
