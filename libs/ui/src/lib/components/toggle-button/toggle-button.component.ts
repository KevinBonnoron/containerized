import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

interface Button {
  label: string;
  value: any;
}

@Component({
  selector: 'containerized-toggle-button',
  standalone: true,
  imports: [MatButtonModule, NgClass],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  providers: [{ provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ToggleButtonComponent }],
})
export class ToggleButtonComponent implements ControlValueAccessor {
  readonly buttons = input.required<Button[]>();
  readonly multiple = input(false, { transform: (value) => !!value });

  value: any;

  disabled = false;
  touched = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  toggleValue(value: any) {
    if (this.multiple()) {
      this.value = this.isSelected(value) ? [...this.value.filter((v: any) => v !== value)] : [...(this.value ?? []), value];
    } else {
      this.value = this.value === value ? undefined : value;
    }

    this.onChange(this.value);
    this.markAsTouched();
  }

  writeValue(obj: any) {
    this.value = obj;
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

  isSelected(value: any) {
    if (this.value === undefined) {
      return false;
    }

    if (this.multiple()) {
      return this.value.includes(value);
    } else {
      return value === this.value;
    }
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
