import { Injectable, inject } from '@angular/core';
import { ContainerEventDto, DockerContainerDto, DockerEventDto } from '@containerized/shared';
import { addEntity, removeEntity, updateEntity } from '@ngrx/signals/entities';
import { Socket } from 'ngx-socket-io';
import { DockerContainersStore } from '../docker-containers.store';

@Injectable()
export class DockerContainersGateway {
  private readonly socket = inject(Socket);
  private readonly dockerContainersStore = inject(DockerContainersStore);

  constructor() {
    this.socket.on('docker.events', (dockerEvent: DockerEventDto) => {
      if (dockerEvent.type === 'container') {
        this.handleDockerContainerEvent(dockerEvent);
      }
    });
  }

  private handleDockerContainerEvent(containerEvent: ContainerEventDto) {
    switch (containerEvent.action) {
      case 'start':
        this.dockerContainersStore.patchState(updateEntity({ id: containerEvent.id, changes: { status: 'running' } }));
        break;

      case 'create':
        const dockerContainer: DockerContainerDto = {
          id: containerEvent.id,
          name: containerEvent.name,
          image: containerEvent.image,
          created: new Date(),
          status: 'created',
          labels: [], // TODO
          ports: [],
          volumes: [], // TODO
          environments: [], // TODO
        };

        this.dockerContainersStore.patchState(addEntity(dockerContainer));
        break;

      case 'die':
        this.dockerContainersStore.patchState(updateEntity({ id: containerEvent.id, changes: { status: 'exited' } }));
        break;

      case 'destroy':
        this.dockerContainersStore.patchState(removeEntity(containerEvent.id));
        break;
    }
  }
}
