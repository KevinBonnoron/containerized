import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { EnvironmentsEffects } from './+state/environments.effects';
import { EnvironmentsFacade } from './+state/environments.facade';
import { EnvironmentsFeature } from './+state/environments.feature';
import { EnvironmentsService } from './services';


@NgModule({
  providers: [
    provideState(EnvironmentsFeature),
    provideEffects(EnvironmentsEffects),
    EnvironmentsFacade,
    EnvironmentsService,
  ]
})
export class FeatureEnvironmentsDataAccessModule {}
