import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DockerContainersStore } from '@containerized/features/docker-containers/data-access';
import { DockerContainerDto } from '@containerized/shared';
import { DockerContainersFormComponent } from '../form/form.component';

@Component({
  selector: 'containerized-docker-containers-create',
  standalone: true,
  imports: [DockerContainersFormComponent, MatDialogModule],
  templateUrl: './create.component.html',
})
export class DockerContainersCreateComponent {
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly dockerContainersStore = inject(DockerContainersStore);

  onSubmitted(dockerContainer: DockerContainerDto) {
    this.dockerContainersStore.create(dockerContainer);
    this.dockerContainersStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
