import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpenning: boolean = false;
  menuBtnIcon: string = 'menu';
  constructor(private _authService: AuthService) {}

  toggleMenu(): void {
    this.isMenuOpenning = !this.isMenuOpenning;
    if (this.isMenuOpenning) {
      this.menuBtnIcon = 'close';
    } else {
      this.menuBtnIcon = 'menu';
    }
  }

  logOut(): void {
    this._authService.logout();
  }

  get user(): User {
    return this._authService.getUser;
  }
  ngOnInit(): void {}
}
