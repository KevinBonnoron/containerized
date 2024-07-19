import { Directive, inject } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { isEqual } from 'monadojs';
import { Subject } from 'rxjs';

@Directive()
export abstract class DefaultControlValueAccessor<T> implements MatFormFieldControl<T>, ControlValueAccessor {
  static nextId = 0;

  readonly ngControl = inject(NgControl, { optional: true, self: true });

  readonly stateChanges = new Subject<void>();
  id = `${DefaultControlValueAccessor.nextId++}`;
  placeholder!: string;
  focused!: boolean;
  empty!: boolean;
  shouldLabelFloat!: boolean;
  required!: boolean;
  errorState!: boolean;
  controlType?: string | undefined;
  autofilled?: boolean | undefined;
  userAriaDescribedBy?: string | undefined;
  disableAutomaticLabeling?: boolean | undefined;

  _value!: T | null;
  disabled = false;
  touched = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  constructor() {
    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }
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

  setDescribedByIds(ids: string[]): void {
    // TODO
  }

  onContainerClick(event: MouseEvent): void {
    // TODO
  }

  get value() {
    return this._value;
  }

  set value(value: T | null) {
    if (!isEqual(value, this._value)) {
      this._value = value;
      this.markAsChanged();
    }
  }

  protected markAsChanged() {
    this.stateChanges.next();
    this.onChange(this._value);
  }

  protected markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
