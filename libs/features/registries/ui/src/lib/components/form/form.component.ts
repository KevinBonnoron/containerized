import { Component, type OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import type { RegistryDto, RegistryType } from '@containerized/shared';

@Component({
  selector: 'containerized-registries-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class RegistriesFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly registry = input<RegistryDto>();
  readonly submitted = output<RegistryDto>();

  readonly formGroup = this.formBuilder.nonNullable.group({
    id: [1],
    name: ['', [Validators.required]],
    type: ['dockerhub' as RegistryType, [Validators.required]],
    username: [''],
    accessToken: [''],
    password: [''],
    url: [''],
  });

  ngOnInit() {
    const registry = this.registry();
    if (registry) {
      this.formGroup.patchValue({
        id: registry.id,
        name: registry.name,
        type: registry.type,
        username: registry.username,
      });

      if (registry.type === 'dockerhub' || registry.type === 'gitlab') {
        this.formGroup.patchValue({
          accessToken: registry.accessToken,
        });
      }

      if (registry.type === 'custom') {
        this.formGroup.patchValue({
          password: registry.password,
          url: registry.url,
        });
      }
    }
  }

  onSubmit(dockerContainer: Partial<RegistryDto>) {
    // TODO add checks
    this.submitted.emit(dockerContainer as RegistryDto);
  }

  get typeCtrl() {
    return this.formGroup.controls['type'];
  }
}
