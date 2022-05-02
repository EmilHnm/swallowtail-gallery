import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material/grid-list';
import { Post } from 'src/app/model/post';

@Component({
  selector: 'app-picture-list',
  templateUrl: './picture-list.component.html',
  styleUrls: ['./picture-list.component.css'],
})
export class PictureListComponent implements OnInit, AfterContentInit {
  @ViewChild('grid') grid: MatGridList;
  @Input() postList: Post[];
  gridByBreakpoint = {
    lg: 6,
    xl: 5,
    md: 4,
    sm: 3,
    xs: 2,
  };

  constructor(private observableMedia: MediaObserver) {}

  ngAfterContentInit() {
    this.observableMedia.asObservable().subscribe((change: MediaChange[]) => {
      this.grid.cols = this.gridByBreakpoint[change[0].mqAlias];
    });
  }

  ngOnInit(): void {}
}
