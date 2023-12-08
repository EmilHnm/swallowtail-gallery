import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-picture-list-item',
  templateUrl: './picture-list-item.component.html',
  styleUrls: ['./picture-list-item.component.css'],
})
export class PictureListItemComponent implements OnInit, AfterContentInit {
  @Input() post: Post;
  serverUrl: string = environment.server;
  constructor() {}

  ngOnInit(): void {}
  ngAfterContentInit(): void {}
}
