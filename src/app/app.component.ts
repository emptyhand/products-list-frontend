import {Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private title = 'Products list';

  isCollapsed: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
  }
}
