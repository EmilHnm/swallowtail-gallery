import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css'],
})
export class ProgressBarComponent implements OnInit {
  @ViewChild('progressbar') progressBar: ElementRef;
  @Input('value') value;
  mode: ProgressBarMode = 'indeterminate';
  constructor() {}

  ngOnInit(): void {}
}
