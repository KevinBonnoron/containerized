import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { skipEmpty } from '@containerized/utils';

import { EnvironmentsActions } from './environments.actions';
import { EnvironmentsFeature } from './environments.feature';
import { EnvironmentsEntity } from './environments.models';

@Injectable()
export class EnvironmentsFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(EnvironmentsFeature.selectLoaded));
  selected$ = this.store.pipe(select(EnvironmentsFeature.selectSelected), skipEmpty());
  selected = this.store.selectSignal(EnvironmentsFeature.selectSelected);
  allEnvironments = this.store.selectSignal(EnvironmentsFeature.selectAll);

  load() {
    this.store.dispatch(EnvironmentsActions.load());
  }

  create(environment: EnvironmentsEntity) {
    this.store.dispatch(EnvironmentsActions.create({ environment }));
  }

  delete(id: EnvironmentsEntity['id']) {
    this.store.dispatch(EnvironmentsActions.delete({ id }));
  }

  setSelectedId(id: EnvironmentsEntity['id']) {
    this.store.dispatch(EnvironmentsActions.selectId({ id }));
  }
}
