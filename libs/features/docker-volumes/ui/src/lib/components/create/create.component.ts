import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { DockerVolumeDto } from '@containerized/shared';
import { DockerVolumesFormComponent } from '../form/form.component';

@Component({
  selector: 'containerized-docker-volumes-create',
  standalone: true,
  imports: [DockerVolumesFormComponent, MatDialogModule],
  templateUrl: './create.component.html',
})
export class DockerVolumesCreateComponent {
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  onSubmitted(dockerVolume: DockerVolumeDto) {
    this.dockerVolumesStore.create(dockerVolume);
    this.dockerVolumesStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
