import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { DockerImagesEffects } from './+state/docker-images.effects';
import { DockerImagesFacade } from './+state/docker-images.facade';
import { DockerImagesFeature } from './+state/docker-images.feature';
import { DockerImagesService } from './services';

@NgModule({
  providers: [
    provideState(DockerImagesFeature),
    provideEffects(DockerImagesEffects),
    DockerImagesFacade,
    DockerImagesService,
  ],
})
export class FeatureDockerImagesDataAccessModule {}
