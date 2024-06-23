import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  login(): void {
    this.authService.login(this.username, this.password)
      .subscribe(
        success => {
          if (success) {
            this.router.navigate(['/characters']);
          } else {
            this.errorMessage = 'Invalid credentials';
          }
        },
        error => {
          console.error('Error when logging in:', error);
          this.errorMessage = 'Error when logging in';
        }
      );
  }

}
