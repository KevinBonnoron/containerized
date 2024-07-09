import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerNetworksStore } from '@containerized/features/docker-networks/data-access';
import { DockerNetworkDto } from '@containerized/shared';
import { DockerNetworksFormComponent } from '../form/form.component';

@Component({
  selector: 'containerized-docker-networks-create',
  standalone: true,
  imports: [DockerNetworksFormComponent, MatDialogModule],
  templateUrl: './create.component.html',
})
export class DockerNetworksCreateComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly dockerNetworksStore = inject(DockerNetworksStore);

  onSubmitted(dockerNetwork: DockerNetworkDto) {
    this.dockerNetworksStore.create(dockerNetwork);
    this.dockerNetworksStore.whenSuccess(() => this.matDialogRef.close()).whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
