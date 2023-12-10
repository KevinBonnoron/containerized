import { NgStyle, SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

import { DockerContainersEntity, DockerContainersFacade } from '@containerized/features/docker-containers/data-access';
import { Columns, ConfirmButtonComponent, DotComponent, GridTableViewComponent } from '@containerized/ui';


const STATUS_COLORS: Record<DockerContainersEntity['status'], string> = {
  created: '#6002EE',
  running: '#09af00',
  exited: '#C62828',
  dead: '',
  paused: '',
  removing: '#EF0078',
}

@Component({
  standalone: true,
  imports: [
    ConfirmButtonComponent,
    DotComponent,
    GridTableViewComponent,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgStyle,
    SlicePipe,
  ],
  selector: 'containerized-docker-containers-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainerListComponent {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dockerContainerFacade = inject(DockerContainersFacade);

  readonly dockerContainers = this.dockerContainerFacade.allDockerContainers;
  readonly columns: Columns<DockerContainersEntity> = [
    { id: 'id', title: 'Id' },
    { id: 'names', title: 'Name' },
    { id: 'status', title: 'Status' },
    { id: 'created', title: 'Created' }
  ];

  createContainer(dockerContainer: DockerContainersEntity) {
    this.dockerContainerFacade.create(dockerContainer);
  }

  startContainer(dockerContainer: DockerContainersEntity) {
    this.dockerContainerFacade.start(dockerContainer.id);
  }

  startContainers(dockerContainers: DockerContainersEntity[]) {
    dockerContainers.forEach((dockerContainer) => this.startContainer(dockerContainer));
  }

  restartContainer(dockerContainer: DockerContainersEntity) {
    this.dockerContainerFacade.restart(dockerContainer.id);
  }

  restartContainers(dockerContainers: DockerContainersEntity[]) {
    dockerContainers.forEach((dockerContainer) => this.restartContainer(dockerContainer));
  }

  stopContainer(dockerContainer: DockerContainersEntity) {
    this.dockerContainerFacade.stop(dockerContainer.id);
  }

  stopContainers(dockerContainers: DockerContainersEntity[]) {
    dockerContainers.forEach((dockerContainer) => this.stopContainer(dockerContainer));
  }

  editContainer(dockerContainer: DockerContainersEntity) {
    this.router.navigate(['edit', dockerContainer.id], { relativeTo: this.activatedRoute });
  }

  deleteContainer(dockerContainer: DockerContainersEntity) {
    this.dockerContainerFacade.delete(dockerContainer.id);
  }

  indicatorColor(status: DockerContainersEntity['status']) {
    return STATUS_COLORS[status];
  }

  hasStartedContainers(dockerContainers: DockerContainersEntity[]) {
    return dockerContainers.some((dockerContainer) => dockerContainer.status === 'running');
  }

  hasStoppedContainers(dockerContainers: DockerContainersEntity[]) {
    return dockerContainers.some((dockerContainer) => dockerContainer.status === 'exited');
  }
}
