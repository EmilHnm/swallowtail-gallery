import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/components/dialog/alert-dialog/alert-dialog.component';
import { HttpEventType } from '@angular/common/http';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-account-change-password',
  templateUrl: './account-change-password.component.html',
  styleUrls: ['./account-change-password.component.css'],
})
export class AccountChangePasswordComponent implements OnInit {
  @ViewChild('progressbar') progressBar: ElementRef;
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;
  user: User;
  UserProfile: User & { postCount; avatarImg };
  formGroup: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    console.log(this.formGroup);
    if (
      this.formGroup.controls['newPassword'].status == 'INVALID' ||
      this.formGroup.controls['confirmPassword'].status == 'INVALID' ||
      this.formGroup.controls['oldPassword'].status == 'INVALID'
    ) {
      this._matDialog.open(AlertDialogComponent, {
        data: {
          title: 'Invalid Password',
          content: 'All fields are required',
        },
      });
      return;
    }
    if (
      this.formGroup.controls['newPassword'].value !=
      this.formGroup.controls['confirmPassword'].value
    ) {
      this._matDialog.open(AlertDialogComponent, {
        data: {
          title: 'Invalid Password',
          content: 'Password and Confirm Password are not match',
        },
      });
      return;
    }
    if (
      this.formGroup.controls['newPassword'].value ==
      this.formGroup.controls['oldPassword'].value
    ) {
      this._matDialog.open(AlertDialogComponent, {
        data: {
          title: 'Invalid Password',
          content: 'Password and Old Password must not match',
        },
      });
      return;
    }
    this._userService
      .updatePassword(
        this.formGroup.controls['confirmPassword'].value,
        this.formGroup.controls['oldPassword'].value,
        this._userService.getUserLogingIn().uid
      )
      .subscribe(
        (resp) => {
          if (resp.type === HttpEventType.Response) {
            this._matDialog
              .open(AlertDialogComponent, {
                data: {
                  title: 'Success',
                  content: 'Update success',
                },
              })
              .beforeClosed()
              .subscribe(() => {
                this.progressBar.nativeElement.classList.add('hidden');
                this.value = 0;
                this.formGroup.reset();
              });
          }
          if (resp.type === HttpEventType.UploadProgress) {
            this.progressBar.nativeElement.classList.remove('hidden');
            const percentDone = Math.round((100 * resp.loaded) / resp.total);
            this.value = percentDone;
          }
        },
        (err) => {
          if (err.status == 401) {
            this._matDialog.open(AlertDialogComponent, {
              data: {
                title: 'Invalid Password',
                content: 'Old Password is not match',
              },
            });
          }
        }
      );
  }
  constructor(
    private _userService: UserService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.user = this._userService.getUserLogingIn();
    this._userService.getUserProfile(this.user.uid).subscribe((data) => {
      this.UserProfile = JSON.parse(data.trim());
      this._userService.getHeartedPosts(JSON.parse(this.UserProfile.hearted));
    });
  }
}
