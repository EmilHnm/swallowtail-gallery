import { Post } from 'src/app/model/post';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { PictureService } from 'src/app/service/picture.service';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  PostSearchResult: Post[] = [];
  UserSearchResult: User[] = [];
  UserSearching: boolean = false;
  PostSearching: boolean = false;
  value: string = '';
  constructor(
    private _pictureService: PictureService,
    private _matDialog: MatDialog,
    private _userService: UserService
  ) {}
  search() {
    if (this.value.length <= 0) {
      this._matDialog.open(AlertDialogComponent, {
        data: {
          title: 'Query is missing',
          content: 'Enter something to search box',
        },
      });
      return;
    }
    this.PostSearchResult.length = 0;
    this.UserSearchResult.length = 0;
    this._pictureService.searchPost(this.value).subscribe(
      (data) => {
        try {
          this.PostSearchResult = JSON.parse(data['body'].trim());
        } catch (error) {}
        if (data.type === HttpEventType.UploadProgress) {
          this.PostSearching = true;
        }
        if (data.type === HttpEventType.Response) {
          this.PostSearching = false;
        }
      },
      (error) => {
        this.PostSearching = false;
      }
    );
    this._userService.searchUser(this.value).subscribe(
      (data) => {
        try {
          this.UserSearchResult = JSON.parse(data['body'].trim());
        } catch (error) {}
        if (data.type === HttpEventType.UploadProgress) {
          this.UserSearching = true;
        }
        if (data.type === HttpEventType.Response) {
          this.UserSearching = false;
        }
      },
      (error) => {
        this.UserSearching = false;
      }
    );
  }

  ngOnInit(): void {}
}
