import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { PictureService } from 'src/app/service/picture.service';
import { UserService } from 'src/app/service/user.service';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { environment } from '../../../../environments/environment';
import { Post } from 'src/app/model/post';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  url: any = null;
  isPostOwner: boolean = true;
  loggingInUser: User;
  file: File;
  uploadForm: FormGroup;
  post: Post;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _pictureService: PictureService,
    private _matDialog: MatDialog,
    private _activatedRoute: ActivatedRoute
  ) {}

  onFileChange(e) {
    if (e.target.files.length > 0) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        this.url = reader.result;
      };
      this.file = e.target.files[0];
    } else {
      this.url = null;
    }
  }

  onSubmit() {
    if (this.uploadForm.value.title == '') {
      this._matDialog.open(AlertDialogComponent, {
        data: { title: 'Title is missing', content: 'Please enter title' },
      });
      return;
    }
    if (!this.url) {
      this._matDialog.open(AlertDialogComponent, {
        data: { title: 'Photo is missing', content: 'Please select a photo' },
      });
      return;
    }
    const formData = new FormData();
    formData.append('id', this._activatedRoute.snapshot.queryParams['id']);
    formData.append('title', this.uploadForm.value.title);
    formData.append('description', this.uploadForm.value.description);
    formData.append('visibility', this.uploadForm.value.visibility);
    formData.append('image', this.file);
    formData.append('uid', this._userService.getUserLogingIn().uid);
    this._pictureService.editPost(formData).subscribe(
      (data) => {
        this._matDialog.open(AlertDialogComponent, {
          data: {
            title: 'Success',
            content: 'Post edited successfully',
          },
        });
        this._router.navigate([
          '../post',
          { id: this._activatedRoute.snapshot.queryParams['id'] },
        ]);
      },
      (error) => {
        this._matDialog.open(AlertDialogComponent, {
          data: {
            title: 'Error',
            content: 'Something went wrong! Error code:' + error.status,
          },
        });
        this._router.navigate([
          '../post',
          { id: this._activatedRoute.snapshot.queryParams['id'] },
        ]);
      }
    );
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
        if (postTemp.uid != this.loggingInUser.uid) {
          this.isPostOwner = false;
          console.log('not owner');
          this._matDialog
            .open(AlertDialogComponent, {
              data: {
                title: 'No Permission!',
                content: 'You do not have permission to edit this post',
              },
            })
            .afterClosed()
            .subscribe(() => {
              this._router.navigate(['../post', { id: postTemp.id }]);
              return;
            });
        } else {
          this.uploadForm = new FormGroup({
            title: new FormControl(postTemp.title, Validators.required),
            description: new FormControl(
              postTemp.description,
              Validators.required
            ),
            visibility: new FormControl(
              postTemp.visibility == '1' ? 'public' : 'private',
              Validators.required
            ),
          });
          this.url = environment.serverUrl + postTemp.imagePath;
        }
      });
    });
  }
}
