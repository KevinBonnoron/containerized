import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Socket } from 'ngx-socket-io';

import { DockerContainersActions } from '@containerized/features/docker-containers/data-access';
import { DockerContainerEvent } from '@containerized/shared';

import { DockerEventsEntity } from '../../+state/docker-events.models';

@Injectable()
export class DockerEventsGateway {
  private readonly socket = inject(Socket);
  private readonly store = inject(Store);

  constructor() {
    this.socket.on('docker.events', (dockerEvents: DockerEventsEntity) => {
      switch (dockerEvents.type) {
        case 'container':
          this.handleDockerContainerEvent(dockerEvents);
          break;
      }
    });
  }

  private handleDockerContainerEvent(dockerContainerEvent: DockerContainerEvent) {
    switch (dockerContainerEvent.action) {
      case 'start':
        this.store.dispatch(DockerContainersActions.startSuccess({ id: dockerContainerEvent.actor.id }));
        break;

      case 'create':
        this.store.dispatch(DockerContainersActions.createSuccess({ dockerContainer: {
          id: dockerContainerEvent.actor.id,
          names: [dockerContainerEvent.actor.attributes['name']],
          image: dockerContainerEvent.actor.attributes['image'],
          created: new Date(),
          ports: [],
          status: 'created'
        } }));
        break;

      case 'die':
        this.store.dispatch(DockerContainersActions.stopSuccess({ id: dockerContainerEvent.actor.id }));
        break;

      case 'destroy':
        this.store.dispatch(DockerContainersActions.deleteSuccess({ id: dockerContainerEvent.actor.id }))
    }
  }
}
