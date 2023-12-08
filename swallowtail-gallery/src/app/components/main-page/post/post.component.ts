import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post';
import { PictureService } from 'src/app/service/picture.service';
import { PictureDialogComponent } from '../../dialog/picture-dialog/picture-dialog.component';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/model/user';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { HttpEventType } from '@angular/common/http';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  value = false;
  _basedUrl = environment.endpoint;
  post: Post = new Post();
  loggingInUser: User;
  heartedArr: string[];
  creator: string = '';
  hearted: boolean = true;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog,
    private _pictureService: PictureService,
    private _authService: AuthService
  ) {
    this.loggingInUser = _authService.getUser;
  }
  heart() {
    this.hearted = !this.hearted;

    if (this.hearted) {
      this.heartedArr.push(this.post.id);
    } else {
      this.heartedArr.splice(this.heartedArr.indexOf(this.post.id), 1);
    }
    this.loggingInUser.hearted = JSON.stringify(this.heartedArr);
    this._pictureService
      .setPostHearted(this.loggingInUser.id, this.loggingInUser.hearted)
      .subscribe((data) => {
        console.log(data);
      });
  }
  openPictureDialog(): void {
    this._matDialog.open(PictureDialogComponent, {
      height: '90vh',
      data: {
        title: this.post.title,
        url: this.post.imagePath,
        date: this.post.created_at,
      },
    });
  }

  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((params) => {
      if (!params['id']) {
        this._router.navigate(['/']);
        return;
      }
      this._pictureService.getPost(params['id']).subscribe(
        (data) => {
          if (data.type === HttpEventType.UploadProgress) {
            this.value = true;
          } else if (data.type === HttpEventType.Response) {
            this.value = false;
          }
          try {
            let postTemp = JSON.parse(data['body'].trim())[0];

            this.loggingInUser = this._authService.getUser;
            if (
              this.loggingInUser.id != postTemp.uid &&
              postTemp.visibility == '0'
            ) {
              this._router.navigate(['/']);
              return;
            }
            this.post = postTemp;
            this.heartedArr = JSON.parse(this._authService.getUser.hearted);

            if (this.loggingInUser.hearted.includes(this.post.id)) {
              this.hearted = true;
            } else {
              this.hearted = false;
            }
            // this._authService.getUser(this.post.uid).subscribe((data) => {
            //   this.creator = JSON.parse(data.trim())[0].name;
            // });
          } catch (error) {}
        },
        (err) => {
          this._router.navigate(['./pagenotfound']);
        }
      );
    });
  }
}
