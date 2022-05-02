import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';

@Component({
  selector: 'app-picture-dialog',
  templateUrl: './picture-dialog.component.html',
  styleUrls: ['./picture-dialog.component.css'],
})
export class PictureDialogComponent {
  title: string = '';
  url: string = '';
  date: string = '';
  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; url: string; date: string }
  ) {
    this.title = data.title;
    this.url = data.url;
    this.date = data.date;
  }
  ngOnInit(): void {}
}
