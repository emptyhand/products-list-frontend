import { Component, HostListener, OnInit} from '@angular/core';
import { AuthService } from "./auth/auth.service";
import {HttpService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private title = 'Products list';

  isCollapsed: boolean = false;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
  ) {}

  ngOnInit(): void {
  }
}
