import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { DockerVolumesEffects } from './+state/docker-volumes.effects';
import { DockerVolumesFacade } from './+state/docker-volumes.facade';
import { DockerVolumesFeature } from './+state/docker-volumes.feature';
import { DockerVolumesService } from './services';

@NgModule({
  providers: [
    provideState(DockerVolumesFeature),
    provideEffects(DockerVolumesEffects),
    DockerVolumesFacade,
    DockerVolumesService,
  ],
})
export class FeatureDockerVolumesDataAccessModule {}
