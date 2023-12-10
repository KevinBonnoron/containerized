import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { DockerVolumesActions } from './docker-volumes.actions';
import { DockerVolumesFeature } from './docker-volumes.feature';

@Injectable()
export class DockerVolumesFacade {
  private readonly store = inject(Store);

  loaded = this.store.selectSignal(DockerVolumesFeature.selectLoaded);
  allVolumes = this.store.selectSignal(DockerVolumesFeature.selectAll);

  load() {
    this.store.dispatch(DockerVolumesActions.load());
  }
}
