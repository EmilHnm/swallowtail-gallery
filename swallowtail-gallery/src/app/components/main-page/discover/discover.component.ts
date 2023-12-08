import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { PictureService } from 'src/app/service/picture.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.css'],
})
export class DiscoverComponent implements OnInit {
  posts: Post[] = [];
  progress: boolean = false;
  constructor(private _pictureService: PictureService) {}

  ngOnInit(): void {
    this._pictureService.getAllPublicPictures().subscribe({
      next: (res) => {
        if (res.type === HttpEventType.UploadProgress) {
          this.progress = false;
        }
        if (res.type === HttpEventType.Response) {
          this.progress = true;
        }
        if (res.body?.status === 'success') {
          this.posts = res.body.data;
        }
      },
    });
  }
}
