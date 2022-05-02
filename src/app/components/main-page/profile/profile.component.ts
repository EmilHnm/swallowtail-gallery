import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/model/post';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  isProfileOwner: boolean = false;
  uid: string;
  UserProfile: User & { postCount; avatarImg };

  UserPosts: Post[] = [];
  HeartedPost: Post[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    public _userService: UserService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.uid = params.get('id');

      if (this.uid == this._userService.getUserLogingIn().uid) {
        this.isProfileOwner = true;
      }
      this._userService.getUserProfile(this.uid).subscribe((data) => {
        this.UserProfile = JSON.parse(data.trim());
        this._userService
          .getHeartedPosts(JSON.parse(this.UserProfile.hearted))
          .subscribe((data) => {
            this.HeartedPost = JSON.parse(data.trim());
          });
      });
      this._userService.getUserPosts(this.uid).subscribe((data) => {
        this.UserPosts = JSON.parse(data.trim());
      });
    });
  }
}
