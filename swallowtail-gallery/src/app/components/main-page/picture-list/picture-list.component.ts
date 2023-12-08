import {
  AfterContentInit,
  Component,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth < 600) {
      this.size = 'xs';
    } else if (event.target.innerWidth < 960) {
      this.size = 'sm';
    } else if (event.target.innerWidth < 1280) {
      this.size = 'md';
    } else if (event.target.innerWidth < 1440) {
      this.size = 'lg';
    } else if (event.target.innerWidth < 1920) {
      this.size = 'xl';
    } else {
      this.size = 'lg';
    }
  }

  size: 'lg' | 'xl' | 'md' | 'sm' | 'xs' = 'lg';

  gridByBreakpoint = {
    lg: 6,
    xl: 5,
    md: 4,
    sm: 3,
    xs: 2,
  };

  constructor() {}

  ngAfterContentInit() {}

  ngOnInit(): void {}
}
