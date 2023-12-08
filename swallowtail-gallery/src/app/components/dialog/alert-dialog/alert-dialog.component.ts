import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent {
  alertTitle: string = '';
  alertString: string = '';

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: { title: string; content: string }
  ) {
    this.alertTitle = data.title;
    this.alertString = data.content;
  }
}
