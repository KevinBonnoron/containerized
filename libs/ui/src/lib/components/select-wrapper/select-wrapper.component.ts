import { Component, input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

interface Value {
  label?: string;
  value: string;
}

@Component({
  selector: 'select-wrapper',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './select-wrapper.component.html',
  styleUrl: './select-wrapper.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: SelectWrapperComponent }],
})
export class SelectWrapperComponent implements ControlValueAccessor {
  readonly values = input.required<Value[]>();
  readonly formControl = new FormControl();

  disabled = false;
  touched = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  onSelectionChange(value: any) {
    this.onChange(value);
    this.markAsTouched();
  }

  writeValue(obj: any) {
    this.formControl.setValue(obj);
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
