import {
  Component,
  ChangeDetectionStrategy,
  Input,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const DROPDOWN_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropdownComponent),
  multi: true,
};

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [DROPDOWN_CONTROL_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() public dropdownOptions: string[];
  @Input() public formControlName: string;
  @Output() public selected = new EventEmitter<{
    controlName: string;
    option: string;
  }>();

  public value: string;
  private onTouch: Function;
  private onModelChange: Function;

  public registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  public registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  public writeValue(value: string) {
    this.value = value;
  }

  public chooseDropdownItem(option: string): void {
    this.value = option;
    this.onModelChange(option);
    this.onTouch();
    this.selected.emit({ controlName: this.formControlName, option });
  }

  public markAsTouched(): void {
    this.onTouch();
  }
}
