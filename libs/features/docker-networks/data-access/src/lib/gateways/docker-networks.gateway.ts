import { Injectable, inject } from '@angular/core';
import { DockerEventDto, DockerNetworkDto, NetworkEventDto } from '@containerized/shared';
import { addEntity, removeEntity } from '@ngrx/signals/entities';
import { Socket } from 'ngx-socket-io';
import { DockerNetworksStore } from '../docker-networks.store';

@Injectable()
export class DockerNetworksGateway {
  private readonly socket = inject(Socket);
  private readonly dockerNetworksStore = inject(DockerNetworksStore);

  constructor() {
    this.socket.on('docker.events', (dockerEvent: DockerEventDto) => {
      if (dockerEvent.type === 'network') {
        this.handleDockerContainerEvent(dockerEvent);
      }
    });
  }

  private handleDockerContainerEvent(networkEvent: NetworkEventDto) {
    switch (networkEvent.action) {
      case 'create':
        const dockerNetwork: DockerNetworkDto = {
          id: networkEvent.id,
          name: networkEvent.name,
          scope: '', // TODO
          driver: networkEvent.driver,
          enableIPv6: false, // TODO
          system: false, // TODO
        };

        this.dockerNetworksStore.patchState(addEntity(dockerNetwork));
        break;

      case 'destroy':
        this.dockerNetworksStore.patchState(removeEntity(networkEvent.id));
        break;
    }
  }
}
