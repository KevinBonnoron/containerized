import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DockerVolumeDto } from '@containerized/shared';

@Component({
  selector: 'containerized-docker-volumes-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class DockerVolumesFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly dockerVolume = input<DockerVolumeDto>();
  readonly submitted = output<DockerVolumeDto>();

  readonly formGroup = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    labels: [{} as any, [Validators.required]],
    driver: ['local', [Validators.required]],
    mountPoint: [''],
    scope: [''],
  });

  ngOnInit() {
    const dockerVolume = this.dockerVolume();
    if (dockerVolume) {
      this.formGroup.setValue({
        name: dockerVolume.name,
        labels: dockerVolume.labels,
        driver: dockerVolume.driver,
        mountPoint: dockerVolume.mountPoint,
        scope: dockerVolume.scope,
      })
    }
  }

  onSubmit(dockerVolume: Partial<DockerVolumeDto>) {
    // TODO add checks
    this.submitted.emit(dockerVolume as DockerVolumeDto);
  }
}
