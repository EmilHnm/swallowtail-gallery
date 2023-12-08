import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('alert') alert;
  constructor(private _router: Router, private _authService: AuthService) {}

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
    if (new UntypedFormControl(form.value.email, Validators.email).errors) {
      this.alert.nativeElement.innerHTML = 'Please enter a valid email';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }
    this._authService
      .login(form.value.email, form.value.password)
      .then((user: User) => {
        this._router.navigate(['/']);
      })
      .catch((error) => {
        this.alert.nativeElement.innerHTML = error;
      });
  }

  ngOnInit() {
    if (this._authService.getUser) {
      this._router.navigate(['/']);
    }
  }
}
