import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin(): void {
    if (localStorage.getItem('user') == null) {
      this._router.navigate(['/login']);
    }
  }
}
