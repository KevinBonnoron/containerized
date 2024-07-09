import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, ValidationErrors, Validator, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { DockerContainerVolume } from '@containerized/shared';
import { ConfirmButtonComponent, SelectWrapperComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { entriesOf } from 'monadojs';

@Component({
  selector: 'containerized-docker-containers-form-volume',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatSelectModule, MatButtonModule, MatButtonToggleModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, SelectWrapperComponent],
  templateUrl: './form-volume.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DockerContainersFormVolumeComponent },
    { provide: NG_VALIDATORS, multi: true, useExisting: DockerContainersFormVolumeComponent },
  ],
})
export class DockerContainersFormVolumeComponent implements OnInit, ControlValueAccessor, Validator {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  readonly volumes = this.dockerVolumesStore.entities;
  readonly formArray = this.formBuilder.array<FormGroup>([]);

  isDisabled = false;
  onChange = (_value: DockerContainerVolume[]) => {};
  onTouched = () => {};

  ngOnInit() {
    this.formArray.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => this.markAsChanged());
  }

  isBindControl(control: FormGroup) {
    return control.controls['type'].value === 'bind';
  }

  addElement(volume: DockerContainerVolume = { type: 'named', name: '', destination: '', mode: 'z', propgation: '', rw: true }) {
    const control = this.formBuilder.group({
      type: [volume.type, [Validators.required]],
      source: [volume.type === 'named' ? volume.name : volume.source, [Validators.required, Validators.minLength(1)]],
      destination: [volume.destination, [Validators.required, Validators.minLength(1)]],
      mode: [volume.mode],
      propgation: [volume.propgation],
      rw: [volume.rw],
    });

    this.formArray.push(control);
  }

  removeElement(index: number) {
    this.formArray.removeAt(index);
  }

  writeValue(dockerVolumes: DockerContainerVolume[]): void {
    for (const dockerVolume of dockerVolumes) {
      this.addElement(dockerVolume);
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
