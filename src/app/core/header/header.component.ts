import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../features/service/auth.service';
import { CommonModule } from '@angular/common';
import { MatIconModule} from "@angular/material/icon"

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, RouterLink, CommonModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  loggedInUser: string | null = null;

  isMenuVisible = false;  

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

  async toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible; 
    document.querySelector("html")!.style.overflow = this.isMenuVisible ? "hidden" : "auto";  

    if (this.isMenuVisible) {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      mediaQuery.addEventListener("change", () => {
        if (!mediaQuery.matches) {
          this.toggleMenu(); 
        }
      });
    }
  }

}
