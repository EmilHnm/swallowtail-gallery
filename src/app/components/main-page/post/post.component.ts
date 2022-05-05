import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PictureService } from 'src/app/service/picture.service';
import { PictureDialogComponent } from '../../dialog/picture-dialog/picture-dialog.component';
import { environment } from 'src/environments/environment.prod';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  _basedUrl = environment.serverUrl;
  post: Post = new Post();
  loggingInUser: User = new User();
  heartedArr: string[];
  creator: string = '';
  hearted: boolean = true;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog,
    private _pictureService: PictureService,
    private _userService: UserService
  ) {}
  heart() {
    this.hearted = !this.hearted;

    if (this.hearted) {
      this.heartedArr.push(this.post.id);
    } else {
      this.heartedArr.splice(this.heartedArr.indexOf(this.post.id), 1);
    }
    this.loggingInUser.hearted = JSON.stringify(this.heartedArr);
    this._userService.setUser(this.loggingInUser);
    this._pictureService
      .setPostHearted(this.loggingInUser.uid, this.loggingInUser.hearted)
      .subscribe((data) => {
        console.log(data);
      });
  }
  openPictureDialog(): void {
    this._matDialog.open(PictureDialogComponent, {
      height: '90vh',
      data: {
        title: this.post.title,
        url: environment.serverUrl + this.post.imagePath,
        date: this.post.create_date,
      },
    });
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (!params['id']) {
        this._router.navigate(['/']);
        return;
      }
      this._pictureService.getPost(params['id']).subscribe((data) => {
        let postTemp = JSON.parse(data.trim())[0];

        this.loggingInUser = this._userService.getUserLogingIn();
        if (
          this.loggingInUser.uid != postTemp.uid &&
          postTemp.visibility == '0'
        ) {
          this._router.navigate(['/']);
          return;
        }
        this.post = postTemp;
        this.heartedArr = JSON.parse(
          this._userService.getUserLogingIn().hearted
        );

        if (this.loggingInUser.hearted.includes(this.post.id)) {
          this.hearted = true;
        } else {
          this.hearted = false;
        }
        this._userService.getUser(this.post.uid).subscribe((data) => {
          this.creator = JSON.parse(data.trim())[0].username;
        });
      });
    });
  }
}
