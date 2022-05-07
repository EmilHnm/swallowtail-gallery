import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  progress: boolean = false;
  gettingHearted: boolean = false;
  gettingPosts: boolean = false;
  UserPosts: Post[] = [];
  HeartedPost: Post[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    public _userService: UserService,
    private _router: Router
  ) {}
  subscription: any;
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.uid = params.get('id');
      this.UserPosts.length = 0;
      this.HeartedPost.length = 0;
      this._userService.getUserProfile(this.uid).subscribe((data) => {
        if (
          data.type === HttpEventType.DownloadProgress ||
          data.type === HttpEventType.UploadProgress
        ) {
          this.progress = true;
        } else if (data.type === HttpEventType.Response) {
          this.progress = false;
          try {
            this.UserProfile = JSON.parse(data['body'].trim());
            this._userService
              .getHeartedPosts(JSON.parse(this.UserProfile.hearted))
              .subscribe(
                (data) => {
                  if (data.type === HttpEventType.UploadProgress) {
                    this.gettingHearted = true;
                  }
                  if (data.type === HttpEventType.Response) {
                    this.gettingHearted = false;
                  }
                  try {
                    this.HeartedPost = JSON.parse(data['body'].trim());
                  } catch (error) {}
                },
                (error) => {
                  this.gettingHearted = false;
                }
              );
          } catch (error) {}
        }
      });
      if (this.uid == this._userService.getUserLogingIn().uid) {
        this.isProfileOwner = true;
        this._userService.getUserPosts(this.uid).subscribe(
          (data) => {
            if (data.type === HttpEventType.UploadProgress) {
              this.gettingPosts = true;
            }
            if (data.type === HttpEventType.Response) {
              this.gettingPosts = false;
            }
            try {
              this.UserPosts = JSON.parse(data['body'].trim());
            } catch (error) {}
          },
          (error) => {
            this.gettingPosts = false;
          }
        );
      } else {
        this._userService.getUserPostsPublicPosts(this.uid).subscribe(
          (data) => {
            if (data.type === HttpEventType.UploadProgress) {
              this.gettingPosts = true;
            }
            if (data.type === HttpEventType.Response) {
              this.gettingPosts = false;
            }
            try {
              this.UserPosts = JSON.parse(data['body'].trim());
            } catch (error) {}
          },
          (err) => {
            this._router.navigate(['./pagenotfound']);
          }
        ),
          (error) => {
            this.gettingPosts = false;
          };
      }
    });
  }
}
