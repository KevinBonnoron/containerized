import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { DefaultControlValueAccessor } from '../../directives';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent extends DefaultControlValueAccessor<any> {
  readonly buttons = input.required<Button[]>();
  readonly multiple = input(false, { transform: (value) => !!value });

  toggleValue(value: any) {
    if (this.multiple()) {
      this.value = this.isSelected(value) ? [...this.value.filter((v: any) => v !== value)] : [...(this.value ?? []), value];
    } else {
      this.value = this.value === value ? undefined : value;
    }

    this.onChange(this.value);
    this.markAsTouched();
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
}
