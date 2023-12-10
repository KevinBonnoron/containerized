import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { DockerContainersEffects } from './+state/docker-containers.effects';
import { DockerContainersFacade } from './+state/docker-containers.facade';
import { DockerContainersFeature } from './+state/docker-containers.feature';
import { DockerContainersService } from './services';

@NgModule({
  providers: [
    provideState(DockerContainersFeature),
    provideEffects(DockerContainersEffects),
    DockerContainersFacade,
    DockerContainersService
  ],
})
export class FeatureDockerContainersDataAccessModule {}
