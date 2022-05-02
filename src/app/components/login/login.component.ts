import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('alert') alert;
  constructor(private _router: Router, private _userService: UserService) {}

  onLoginWithEmail(form: NgForm) {
    if (form.value.password == '' || form.value.email == '') {
      this.alert.nativeElement.innerHTML = 'Please fill all the fields';
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
    this._userService.login(form.value.email, form.value.password).subscribe(
      (res) => {
        let user = JSON.parse(res.trim());
        this._userService.setUser(user[0]);
        this._router.navigate(['/']);
      },
      (err) => {
        if (err.status == 401) {
          this.alert.nativeElement.innerHTML = 'Invalid email or password';
        }
      }
    );
  }

  ngOnInit() {
    if (this._userService.getUserLogingIn()) {
      this._router.navigate(['/']);
    }
  }
}
