import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { AlertDialogComponent } from 'src/app/components/dialog/alert-dialog/alert-dialog.component';
import { HttpEventType } from '@angular/common/http';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css'],
})
export class AccountEditComponent implements OnInit {
  @ViewChild('progressbar') progressBar: ElementRef;
  mode: ProgressBarMode = 'determinate';
  value = 0;
  bufferValue = 75;

  user: User;
  formGroup: FormGroup;
  UserProfile: User & { postCount; avatarImg };
  constructor(
    private _userService: UserService,
    private _matDialog: MatDialog
  ) {}
  onSubmit() {
    if (this.formGroup.controls['username'].status == 'INVALID') {
      this._matDialog.open(AlertDialogComponent, {
        data: { title: 'Invalid Username', content: 'Username is invalid' },
      });
      return;
    }
    if (this.formGroup.controls['email'].status == 'INVALID') {
      this._matDialog.open(AlertDialogComponent, {
        data: { title: 'Invalid Email', content: 'Email is invalid' },
      });
      return;
    }
    this._userService
      .updateUser(
        this.user.uid,
        this.formGroup.value.username,
        this.formGroup.value.email
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
              data: { title: 'Invalid Email', content: 'This email was used' },
            });
          }
        }
      );
  }
  ngOnInit(): void {
    this.user = this._userService.getUserLogingIn();
    this._userService.getUserProfile(this.user.uid).subscribe((data) => {
      this.UserProfile = JSON.parse(data.trim());
      this._userService.getHeartedPosts(JSON.parse(this.UserProfile.hearted));
    });
    this.formGroup = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
      ]),
    });
  }
}
