import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DockerContainerEnvironment } from '@containerized/shared';
import { ConfirmButtonComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { entriesOf } from 'monadojs';

@Component({
  selector: 'containerized-docker-containers-form-environment',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form-environment.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DockerContainersFormEnvironmentComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: DockerContainersFormEnvironmentComponent },
  ],
})
export class DockerContainersFormEnvironmentComponent implements OnInit, ControlValueAccessor, Validator {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  readonly formArray = this.formBuilder.array<FormGroup>([]);

  isDisabled = false;
  onChange = (_value: DockerContainerEnvironment[]) => {};
  onTouched = () => {};

  ngOnInit() {
    this.formArray.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.markAsChanged());
  }

  addElement(environment: DockerContainerEnvironment = { key: '', value: '' }) {
    const control = this.formBuilder.group({
      key: [environment.key, [Validators.required]],
      value: [environment.value, [Validators.required]],
    });

    this.formArray.push(control);
  }

  removeElement(index: number) {
    this.formArray.removeAt(index);
  }

  writeValue(dockerEnvironments: DockerContainerEnvironment[]): void {
    for (const dockerEnvironment of dockerEnvironments) {
      this.addElement(dockerEnvironment);
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
