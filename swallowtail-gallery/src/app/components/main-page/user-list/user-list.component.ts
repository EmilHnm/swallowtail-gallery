import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatGridList } from '@angular/material/grid-list';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @ViewChild('grid') grid: MatGridList;
  @Input('users') users: User[];

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
