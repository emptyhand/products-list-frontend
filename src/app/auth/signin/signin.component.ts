import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin(form: NgForm) {
    this.authService.login(
      form.value.email,
      form.value.password
    )
      .subscribe(
        res => {
          return this.router.navigateByUrl('/shopping');
        },
        error => console.log(error),
      );
  }

}
