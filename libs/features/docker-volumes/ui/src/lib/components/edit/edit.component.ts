import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { DockerVolumeDto } from '@containerized/shared';
import { map } from 'rxjs';
import { DockerVolumesFormComponent } from '../form/form.component';

@Component({
  standalone: true,
  imports: [DockerVolumesFormComponent, MatDialogModule],
  selector: 'containerized-docker-containers-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerVolumesEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  readonly dockerVolume = toSignal<DockerVolumeDto>(this.activatedRoute.data.pipe(map(({ dockerVolume }) => dockerVolume)), { requireSync: true });

  onSubmitted(dockerVolume: DockerVolumeDto) {
    this.dockerVolumesStore.update(dockerVolume);
    this.dockerVolumesStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
