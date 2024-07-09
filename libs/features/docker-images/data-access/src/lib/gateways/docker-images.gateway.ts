import { Injectable, inject } from '@angular/core';
import { DockerEventDto, DockerImageDto, ImageEventDto } from '@containerized/shared';
import { addEntity, removeEntity } from '@ngrx/signals/entities';
import { Socket } from 'ngx-socket-io';
import { DockerImagesStore } from '../docker-images.store';

@Injectable()
export class DockerImagesGateway {
  private readonly socket = inject(Socket);
  private readonly dockerImagesStore = inject(DockerImagesStore);

  constructor() {
    this.socket.on('docker.events', (dockerEvent: DockerEventDto) => {
      if (dockerEvent.type === 'image') {
        this.handleDockerImageEvent(dockerEvent);
      }
    });
  }

  private handleDockerImageEvent(imageEvent: ImageEventDto) {
    switch (imageEvent.action) {
      case 'pull':
        const dockerImage: DockerImageDto = {
          id: imageEvent.id,
          labels: {}, // TODO
          tags: [], // TODO
          used: false, // TODO
        };

        this.dockerImagesStore.patchState(addEntity(dockerImage));
        break;

      case 'delete':
        this.dockerImagesStore.patchState(removeEntity(imageEvent.id));
        break;
    }
  }
}
