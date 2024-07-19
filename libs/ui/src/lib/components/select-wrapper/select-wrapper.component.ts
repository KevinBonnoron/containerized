import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DefaultControlValueAccessor } from '../../directives';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWrapperComponent extends DefaultControlValueAccessor<string[]> {
  readonly values = input.required<Value[]>();

  onSelectionChange(value: any) {
    this.onChange(value);
    this.markAsTouched();
  }
}
