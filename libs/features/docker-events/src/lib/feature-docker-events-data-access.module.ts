import { NgModule, inject } from '@angular/core';
import { provideEffects } from '@ngrx/effects';

import { DockerEventsEffects } from './+state/docker-events.effects';
import { DockerEventsGateway } from './gateways';

@NgModule({
  providers: [
    provideEffects(DockerEventsEffects),
    DockerEventsGateway,
  ],
})
export class FeatureDockerEventsDataAccessModule {
  readonly dockerEventsGateway = inject(DockerEventsGateway);
}
