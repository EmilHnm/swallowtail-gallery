import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutSideHandle]',
})
export class ClickOutSideHandleDirective {
  constructor(private _element: ElementRef) {}

  @Output('appHandlingClickOutside') public clickOutside: EventEmitter<any> =
    new EventEmitter();

  @HostListener('document:click', ['$event.target'])
  onMouseEnter(targetE) {
    const clickInside = this._element.nativeElement.contains(targetE);
    if (!clickInside) {
      this.clickOutside.emit(null);
    }
  }
}
