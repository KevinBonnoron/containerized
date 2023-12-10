import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { skipEmpty } from '@containerized/utils';

import { DockerContainersActions } from './docker-containers.actions';
import { DockerContainersFeature } from './docker-containers.feature';
import { DockerContainersEntity } from './docker-containers.models';

@Injectable()
export class DockerContainersFacade {
  private readonly store = inject(Store);

  loaded = this.store.selectSignal(DockerContainersFeature.selectLoaded);
  selected$ = this.store.pipe(select(DockerContainersFeature.selectSelected), skipEmpty());
  allDockerContainers = this.store.selectSignal(DockerContainersFeature.selectAll);

  load() {
    this.store.dispatch(DockerContainersActions.load());
  }

  create(dockerContainer: DockerContainersEntity) {
    this.store.dispatch(DockerContainersActions.create({ dockerContainer }));
  }

  start(id: DockerContainersEntity['id']) {
    this.store.dispatch(DockerContainersActions.start({ id }));
  }
  
  restart(id: DockerContainersEntity['id']) {
    this.store.dispatch(DockerContainersActions.restart({ id }));
  }

  stop(id: DockerContainersEntity['id']) {
    this.store.dispatch(DockerContainersActions.stop({ id }));
  }

  delete(id: DockerContainersEntity['id']) {
    this.store.dispatch(DockerContainersActions.delete({ id }));
  }

  setSelectedId(id: DockerContainersEntity['id']) {
    this.store.dispatch(DockerContainersActions.selectId({ id }));
  }
}
