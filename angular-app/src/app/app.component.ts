import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  template: "<router-outlet></router-outlet>",
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-app';
}
