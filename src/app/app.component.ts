import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/footer/footer.component";
import { HeaderComponent } from './core/header/header.component';
import { FeaturesModule } from './features/features.module';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [FormsModule, CommonModule, RouterOutlet, HeaderComponent, FooterComponent, FeaturesModule ]
})
export class AppComponent {
  title = 'rick-morty-dashboard';


}
