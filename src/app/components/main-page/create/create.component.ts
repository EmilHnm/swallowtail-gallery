import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PictureService } from 'src/app/service/picture.service';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  url: any = null;
  file: File;
  disabled: boolean = false;
  progress: boolean = false;
  uploadForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('Enter your description here', [
      Validators.required,
      Validators.maxLength(500),
    ]),
    visibility: new FormControl('public', [Validators.required]),
    image: new FormControl('', [Validators.required]),
  });

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _pictureService: PictureService,
    private _matDialog: MatDialog
  ) {}

  onFileChange(e) {
    if (e.target.files.length > 0) {
      if (e.target.files[0].size > 10485760) {
        this._matDialog.open(AlertDialogComponent, {
          data: {
            title: 'File is too large',
            content: 'File size must be less than 10MB',
          },
        });
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        this.url = reader.result;
      };
      this.file = e.target.files[0];
      console.log(this.file);
    } else {
      this.url = null;
    }
  }
  onReset() {
    this.uploadForm.reset();
    this.uploadForm.value.visibility = 'public';
    this.url = null;
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
    this.disabled = true;
    const formData = new FormData();
    formData.append('title', this.uploadForm.value.title);
    formData.append('description', this.uploadForm.value.description);
    formData.append('visibility', this.uploadForm.value.visibility);
    formData.append('image', this.url);
    formData.append('uid', this._userService.getUserLogingIn().uid);
    this._pictureService.upload(formData).subscribe(
      (response) => {
        if (response.type === HttpEventType.UploadProgress) {
          this.progress = true;
        }
        if (response.type === HttpEventType.Response) {
          this.progress = false;
          try {
            let data = JSON.parse(response['body'].trim());
            this._router.navigate(['./post', { id: data.id }]);
          } catch (error) {}
        }
      },
      (error) => {
        console.log(error);
        this._matDialog.open(AlertDialogComponent, {
          data: {
            title: 'Error!',
            content: 'Something went wrong, please try again!',
          },
        });
      }
    );
  }

  ngOnInit(): void {}
}
