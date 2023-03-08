import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;
  @ViewChild('alert') alert;
  constructor(private _userService: UserService, private _router: Router) {}

  onRegister(form: NgForm) {
    //console.log(new FormControl(form.value.email, Validators.email));
    // Validate empty
    if (
      form.value.password == '' ||
      form.value.username == '' ||
      form.value.email == ''
    ) {
      this.alert.nativeElement.innerHTML = 'Please fill all the fields';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }
    // validate username
    if (form.value.username.length < 3) {
      this.alert.nativeElement.innerHTML =
        'Username must be at least 3 characters';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }
    // validate password
    if (form.value.password.length < 6) {
      this.alert.nativeElement.innerHTML =
        'Password must be at least 6 characters';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }

    //validate email
    if (new FormControl(form.value.email, Validators.email).errors) {
      this.alert.nativeElement.innerHTML = 'Please enter a valid email';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }

    //check email exist

    //
    if (!form.value.agreeTerms) {
      console.log('You must agree to the terms');
      this.alert.nativeElement.innerHTML = 'You must agree to the terms';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }
    this._userService
      .signup(form.value.username, form.value.email, form.value.password)
      .subscribe(
        (res) => {
          let user = JSON.parse(res.trim());
          this._userService.setUser(user);
          this._router.navigate(['/']);
        },
        (err) => {
          console.log(err);
          if (err.status == 401) {
            this.alert.nativeElement.innerHTML = 'Email already exists';
          }
        }
      );
  }

  ngOnInit(): void {
    if (this._userService.getUserLogingIn()) {
      this._router.navigate(['/']);
    }
  }
}
