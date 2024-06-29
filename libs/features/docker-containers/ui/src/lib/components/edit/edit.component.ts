import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DockerContainersStore } from '@containerized/features/docker-containers/data-access';
import { DockerContainerDto } from '@containerized/shared';
import { DockerContainersFormComponent } from '../form/form.component';

@Component({
  standalone: true,
  imports: [DockerContainersFormComponent, MatDialogModule],
  selector: 'containerized-docker-containers-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly dockerContainersStore = inject(DockerContainersStore);

  readonly dockerContainer = toSignal<DockerContainerDto>(this.activatedRoute.data.pipe(map(({ dockerContainer }) => dockerContainer)), { requireSync: true });

  onSubmitted(dockerContainer: DockerContainerDto) {
    this.dockerContainersStore.replace(dockerContainer);
    this.dockerContainersStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
