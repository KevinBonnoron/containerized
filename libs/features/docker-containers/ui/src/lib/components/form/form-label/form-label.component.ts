import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DockerContainerLabel } from '@containerized/shared';
import { ConfirmButtonComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { entriesOf } from 'monadojs';

@Component({
  selector: 'containerized-docker-containers-form-label',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form-label.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DockerContainersFormLabelComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: DockerContainersFormLabelComponent },
  ],
})
export class DockerContainersFormLabelComponent implements OnInit, ControlValueAccessor, Validator {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  readonly formArray = this.formBuilder.array<FormGroup>([]);

  isDisabled = false;
  onChange = (_value: DockerContainerLabel[]) => {};
  onTouched = () => {};

  ngOnInit() {
    this.formArray.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.markAsChanged());
  }

  addElement(dockerLabel: DockerContainerLabel = { key: '', value: '' }) {
    const control = this.formBuilder.group({
      key: [dockerLabel.key, [Validators.required]],
      value: [dockerLabel.value, [Validators.required]],
    });

    this.formArray.push(control);
  }

  removeElement(index: number) {
    this.formArray.removeAt(index);
  }

  writeValue(dockerLabels: DockerContainerLabel[]): void {
    for (const dockerLabel of dockerLabels) {
      this.addElement(dockerLabel);
    }
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.formArray.valid) {
      return null;
    }

    return [...entriesOf(this.formArray.controls)]
      .filter(([, control]) => control.invalid)
      .map(([key, control]) => ({ [key]: control.errors ?? 'invalid' }))
      .reduce((accumulator, error) => ({ ...accumulator, ...error }), {});
  }

  private markAsChanged() {
    this.onChange(this.formArray.value);
  }
}
