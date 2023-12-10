import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';

import { EnvironmentsEntity } from './environments.models';

export const initEnvironments = createAction('[Environments Page] Init');

export const loadEnvironmentsSuccess = createAction(
  '[Environments/API] Load Environments Success',
  props<{ environments: EnvironmentsEntity[] }>()
);

export const loadEnvironmentsFailure = createAction(
  '[Environments/API] Load Environments Failure',
  props<{ error: any }>()
);

export const EnvironmentsActions = createActionGroup({
  source: 'Environments',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ environments: EnvironmentsEntity[] }>(),
    'Load Failure': props<{ error: any }>(),
    Create: props<{ environment: EnvironmentsEntity }>(),
    Delete: props<{ id: EnvironmentsEntity['id'] }>(),
    'Select Id': props<{ id: EnvironmentsEntity['id'] }>(),
  }
});
