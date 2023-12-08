import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  @ViewChild('f') registerForm: NgForm;
  @ViewChild('alert') alert;
  constructor(private _authService: AuthService, private _router: Router) {}

  onRegister(form: NgForm) {
    // Validate empty
    console.log(
      form.value.password == '',
      form.value.name == '',
      form.value.email == ''
    );
    if (
      form.value.password == '' ||
      form.value.name == '' ||
      form.value.email == ''
    ) {
      this.alert.nativeElement.innerHTML = 'Please fill all the fields';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }
    // validate name
    if (form.value.name.length < 3) {
      this.alert.nativeElement.innerHTML = 'name must be at least 3 characters';
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

    if (!form.value.agreeTerms) {
      this.alert.nativeElement.innerHTML = 'You must agree to the terms';
      return;
    } else {
      this.alert.nativeElement.innerHTML = '';
    }

    this._authService
      .register(form.value.name, form.value.email, form.value.password)
      .subscribe({
        next: (data: { token: string; user: User }) => {
          this._authService.setToken = data.token;
          this._authService.setUser = data.user;
          this._router.navigate(['/']);
        },
        error: (error: { error: { message: string } }) => {
          this.alert.nativeElement.innerHTML = error.error.message;
        },
      });
  }

  ngOnInit(): void {}
}
