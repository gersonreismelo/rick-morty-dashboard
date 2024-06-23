// auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<string | null>;
  private readonly currentUserKey = 'currentUser';

  constructor() {
    // Inicializa o BehaviorSubject com o valor do localStorage, se disponível
    const storedUser = localStorage.getItem(this.currentUserKey);
    this.loggedInUserSubject = new BehaviorSubject<string | null>(storedUser);
  }

  login(username: string, password: string): Observable<boolean> {
    // Simplesmente retorna true para qualquer combinação de username e password
    // Aqui você pode implementar lógica de validação de usuário (mock)
    // Para efeitos de teste ou desenvolvimento, sempre retornamos true
    this.loggedInUserSubject.next(username);
    localStorage.setItem(this.currentUserKey, username); // Salva no localStorage
    return of(true);
  }

  logout(): void {
    this.loggedInUserSubject.next(null);
    localStorage.removeItem(this.currentUserKey); // Remove do localStorage
  }

  get loggedInUser(): Observable<string | null> {
    return this.loggedInUserSubject.asObservable();
  }
}
