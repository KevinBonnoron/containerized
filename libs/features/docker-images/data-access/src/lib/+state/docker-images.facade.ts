import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { DockerImagesActions } from './docker-images.actions';
import { DockerImagesFeature } from './docker-images.feature';

@Injectable()
export class DockerImagesFacade {
  private readonly store = inject(Store);

  loaded = this.store.selectSignal(DockerImagesFeature.selectLoaded);
  allDockerImages = this.store.selectSignal(DockerImagesFeature.selectAll);

  load() {
    this.store.dispatch(DockerImagesActions.load());
  }
}
