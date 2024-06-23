import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedInUser: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe(user => {
      this.loggedInUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
