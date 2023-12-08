import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-div-description',
  templateUrl: './div-description.component.html',
  styleUrls: ['./div-description.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DivDescriptionComponent),
      multi: true,
    },
  ],
})
export class DivDescriptionComponent implements ControlValueAccessor {
  @Input() set placeholderValue(value: string) {
    this.placeholder = value;
  }
  constructor() {}

  descriptionValue: string = '';
  placeholder: string = '';
  disabled = false;
  onChange: (descriptionValue: any) => void;
  onTouched: () => void;
  isDisabled: boolean;
  onDescriptionChange(e) {
    if (this.isDisabled) return;
    if (this.descriptionValue.length === 0 && e.target.innerText.length !== 0)
      this.writeValue(e.target.innerText);
    this.onChange(e.target.innerText);
  }
  // Ghi vào value của tag
  writeValue(value: any): void {
    this.descriptionValue = value;
  }
  // Đăng kí với form control khi có thay đổi
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  // Đăng kí với angular khi có thao tác
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
