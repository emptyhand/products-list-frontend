import { Component } from '@angular/core';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Products list';

  private isLoggedIn: boolean;
  private username: string;

  constructor(
    private authService: AuthService
  ) {
    this.isLoggedIn = authService.isLoggedIn;
    this.username = authService.username;
  }

  onLogout() {
    this.authService.logout();
  }
}
