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
  post: Post[] = [];
  progress: boolean = false;
  constructor(private _pictureService: PictureService) {}

  ngOnInit(): void {
    this._pictureService.getAllPublicPictures().subscribe((res) => {
      if (res.type === HttpEventType.UploadProgress) {
        this.progress = false;
      }
      if (res.type === HttpEventType.Response) {
        this.progress = true;
      }

      try {
        let postList = JSON.parse(res['body'].trim());
        postList.map((pic) => {
          let post = new Post();
          post.id = pic.id;
          post.uid = pic.uid;
          post.title = pic.title;
          post.description = pic.description;
          post.imagePath = pic.imagePath;
          post.create_date = pic.created_date;
          post.visibility = pic.visibility;
          this.post.push(post);
        });
      } catch (error) {}
    });
  }
}
