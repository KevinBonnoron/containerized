import { NgModule } from '@angular/core';

import { DockerEventsStore } from './docker-events.store';
import { DockerEventsService } from './services';

@NgModule({
  providers: [
    DockerEventsStore,
    DockerEventsService,
  ],
})
export class FeatureDockerEventsDataAccessModule {}
