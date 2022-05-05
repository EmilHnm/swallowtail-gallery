import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpenning: boolean = false;
  menuBtnIcon: string = 'menu';
  constructor(public userService: UserService) {}

  toggleMenu(): void {
    this.isMenuOpenning = !this.isMenuOpenning;
    if (this.isMenuOpenning) {
      this.menuBtnIcon = 'close';
    } else {
      this.menuBtnIcon = 'menu';
    }
  }

  logOut(): void {
    this.userService.logOut();
  }
  ngOnInit(): void {}
}
