import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertDialogComponent } from 'src/app/components/dialog/alert-dialog/alert-dialog.component';
import { UploadProfileComponent } from 'src/app/components/dialog/upload-profile/upload-profile.component';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-account-change-avatar',
  templateUrl: './account-change-avatar.component.html',
  styleUrls: ['./account-change-avatar.component.css'],
})
export class AccountChangeAvatarComponent implements OnInit {
  constructor(
    private _matDialog: MatDialog,
    private _userService: UserService,
    private _router: Router
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }
  user: User;
  progress: boolean = false;
  UserProfile: User & { postCount; avatar };
  openDialog() {
    this._matDialog
      .open(UploadProfileComponent)
      .afterClosed()
      .subscribe((data) => {
        this._matDialog
          .open(AlertDialogComponent, {
            data: {
              title: 'Success',
              content: 'Profile picture has been updated',
            },
          })
          .afterClosed()
          .subscribe(() => {
            this._router.navigate(['/profile', this.user.id]);
          });
      });
  }

  ngOnInit(): void {
    this.user = this._userService.getUserLogingIn();
    this._userService.getUserProfile(this.user.id).subscribe(
      (data) => {
        if (data.type === HttpEventType.UploadProgress) {
          this.progress = true;
        }
        if (data.type === HttpEventType.Response) {
          this.progress = false;
          try {
            this.UserProfile = JSON.parse(data['body'].trim());
          } catch (error) {}
        }
      },
      (error) => {
        this.progress = false;
      }
    );
  }
}
