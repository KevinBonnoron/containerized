import { Injectable, inject } from '@angular/core';
import { DockerEventDto, DockerVolumeDto, VolumeEventDto } from '@containerized/shared';
import { addEntity, removeEntity } from '@ngrx/signals/entities';
import { Socket } from 'ngx-socket-io';
import { DockerVolumesStore } from '../docker-volumes.store';

@Injectable()
export class DockerVolumesGateway {
  private readonly socket = inject(Socket);
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  constructor() {
    this.socket.on('docker.events', (dockerEvent: DockerEventDto) => {
      if (dockerEvent.type === 'volume') {
        this.handleDockerContainerEvent(dockerEvent);
      }
    });
  }

  private handleDockerContainerEvent(volumeEvent: VolumeEventDto) {
    switch (volumeEvent.action) {
      case 'create':
        const dockerVolume: DockerVolumeDto = {
          name: volumeEvent.name,
          labels: {}, // TODO
          driver: volumeEvent.driver,
          mountPoint: '', // TODO
          scope: '', // TODO
        };

        this.dockerVolumesStore.patchState(addEntity(dockerVolume, { idKey: 'name' }))
        break;

      case 'destroy':
        this.dockerVolumesStore.patchState(removeEntity(volumeEvent.name));
        break;
    }
  }
}
