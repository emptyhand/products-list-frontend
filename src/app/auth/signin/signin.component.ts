import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit {

  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.eventEmitter.subscribe(
      (res:string) => {
        if (res == 'logged-in' || res == 'registered') {
          return this.router.navigateByUrl('/shopping');
        }
        if (res == 'error') {
          this.error = 'Wrong username or password!';
        }
      }
    );
  }

  ngOnInit() {
    this.authService.logout();
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value.email, form.value.password);
  }
}
