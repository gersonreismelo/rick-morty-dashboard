import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<string | null>;
  private readonly currentUserKey = 'currentUser';

  constructor() {
    const storedUser = localStorage.getItem(this.currentUserKey);
    this.loggedInUserSubject = new BehaviorSubject<string | null>(storedUser);
  }

  login(username: string, password: string): Observable<boolean> {
    if (username && password) {
      this.loggedInUserSubject.next(username);
      localStorage.setItem(this.currentUserKey, username); 
      return of(true);
    } else {
      return of(false);
    }
  }

  logout(): void {
    this.loggedInUserSubject.next(null);
    localStorage.removeItem(this.currentUserKey); 
  }

  get loggedInUser(): Observable<string | null> {
    return this.loggedInUserSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.loggedInUserSubject.value !== null;
  }
}
