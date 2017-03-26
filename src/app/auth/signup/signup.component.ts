import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/signin');
    }
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    this.authService.register(
      form.value.email,
      form.value.password
    ).subscribe(
      res => this.router.navigateByUrl('/shopping')
    );
  }
}
