import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PictureService } from 'src/app/service/picture.service';
import { UserService } from 'src/app/service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  url: any = null;
  file: File;
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
    const formData = new FormData();
    formData.append('title', this.uploadForm.value.title);
    formData.append('description', this.uploadForm.value.description);
    formData.append('visibility', this.uploadForm.value.visibility);
    formData.append('image', this.file);
    formData.append('uid', this._userService.getUserLogingIn().uid);
    this._pictureService.upload(formData).subscribe(
      (response) => {
        let data = JSON.parse(response.trim());
        console.log(data);
        this._router.navigate(['../post', { id: data.id }]);
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
