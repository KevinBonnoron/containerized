import { DOCUMENT } from '@angular/common';
import { Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerContainersStore } from '@containerized/features/docker-containers/data-access';
import { DockerContainerDto, DockerContainerPort } from '@containerized/shared';
import { DataLayoutComponent } from 'ngx-data-layout';

const STATUS_COLORS: Record<DockerContainerDto['status'], string> = {
  created: '#6002EE',
  restarting: 'orange',
  starting: '#40723d',
  running: '#09AF00',
  stopping: '#8f5f5f',
  exited: '#C62828',
  dead: 'grey',
  paused: 'yellow',
  removing: '#EF0078',
};

@Directive({
  standalone: true,
})
export class AbstractUiDirective extends DataLayoutComponent<DockerContainerDto> {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dockerContainersStore = inject(DockerContainersStore);

  indicatorColor(status: DockerContainerDto['status']) {
    return STATUS_COLORS[status];
  }

  stringifyPort(port: DockerContainerPort) {
    return `${port.container}${!port.host || port.container === port.host ? '' : `:${port.host}`}/${port.protocol}`;
  }

  openForwardedPort(port: DockerContainerPort) {
    this.document.defaultView?.open(`http://localhost:${port.host}`);
  }

  startContainer(dockerContainer: DockerContainerDto) {
    this.dockerContainersStore.start(dockerContainer.id);
  }

  stopContainer(dockerContainer: DockerContainerDto) {
    this.dockerContainersStore.stop(dockerContainer.id);
  }

  execContainer(dockerContainer: DockerContainerDto) {
    this.router.navigate(['./', dockerContainer.id, 'exec'], { relativeTo: this.activatedRoute });
  }

  restartContainer(dockerContainer: DockerContainerDto) {
    this.dockerContainersStore.restart(dockerContainer.id);
  }

  logContainer(dockerContainer: DockerContainerDto) {
    this.router.navigate(['./', dockerContainer.id, 'log'], { relativeTo: this.activatedRoute });
  }

  editContainer(dockerContainer: DockerContainerDto) {
    this.router.navigate(['./', dockerContainer.id, 'edit'], { relativeTo: this.activatedRoute });
  }

  removeContainer(dockerContainer: DockerContainerDto) {
    this.dockerContainersStore.remove(dockerContainer);
  }

  isAllStartedContainers(dockerContainers: DockerContainerDto[]) {
    return dockerContainers.every((dockerContainer) => dockerContainer.status === 'running');
  }

  isAllStoppedContainers(dockerContainers: DockerContainerDto[]) {
    return dockerContainers.every((dockerContainer) => dockerContainer.status === 'exited');
  }
}
