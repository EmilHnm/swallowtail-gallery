import { Post } from 'src/app/model/post';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { PictureService } from 'src/app/service/picture.service';
import { AlertDialogComponent } from '../../dialog/alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  PostSearchResult: Post[] = [];
  UserSearchResult: User & { avatarImg }[] = [];
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
    this._pictureService.searchPost(this.value).subscribe(
      (data) => {
        this.PostSearchResult = JSON.parse(data.trim());
      },
      (error) => {}
    );
    this._userService.searchUser(this.value).subscribe((data) => {
      this.UserSearchResult = JSON.parse(data.trim());
      console.log(this.UserSearchResult);
    });
  }

  ngOnInit(): void {}
}
