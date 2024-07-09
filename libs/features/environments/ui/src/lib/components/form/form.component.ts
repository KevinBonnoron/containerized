import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { EnvironmentDto } from '@containerized/shared';

@Component({
  selector: 'containerized-environments-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class EnvironmentsFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly environment = input<EnvironmentDto>();
  readonly submitted = output<EnvironmentDto>();

  readonly formGroup = this.formBuilder.nonNullable.group({
    id: [0],
    name: ['local', [Validators.required]],
    url: ['unix:/var/run/docker.sock', [Validators.required]],
  });

  ngOnInit() {
    const environment = this.environment();
    if (environment) {
      this.formGroup.setValue({
        id: environment.id,
        name: environment.name,
        url: environment.url,
      });
    }
  }

  onSubmit(dockerContainer: Partial<EnvironmentDto>) {
    // TODO add checks
    this.submitted.emit(dockerContainer as EnvironmentDto);
  }
}
