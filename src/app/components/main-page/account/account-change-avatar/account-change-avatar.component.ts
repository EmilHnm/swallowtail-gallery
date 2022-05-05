import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  UserProfile: User & { postCount; avatarImg };
  openDialog() {
    this._matDialog
      .open(UploadProfileComponent)
      .afterClosed()
      .subscribe((data) => {
        location.reload();
      });
  }

  ngOnInit(): void {
    this.user = this._userService.getUserLogingIn();
    this._userService.getUserProfile(this.user.uid).subscribe((data) => {
      this.UserProfile = JSON.parse(data.trim());
      this._userService.getHeartedPosts(JSON.parse(this.UserProfile.hearted));
    });
  }
}
