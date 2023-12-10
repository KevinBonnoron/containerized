import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { EnvironmentsActions } from './environments.actions';
import { EnvironmentsEntity } from './environments.models';

const ENVIRONMENTS_FEATURE_KEY = 'environments';

export interface EnvironmentsState extends EntityState<EnvironmentsEntity> {
  selectedId?: string | number; // which Environments record has been selected
  loaded: boolean; // has the Environments list been loaded
  error?: string | null; // last known error (if any)
}

export interface EnvironmentsPartialState {
  readonly [ENVIRONMENTS_FEATURE_KEY]: EnvironmentsState;
}

export const environmentsAdapter: EntityAdapter<EnvironmentsEntity> = createEntityAdapter<EnvironmentsEntity>();

export const initialEnvironmentsState = environmentsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const EnvironmentsFeature = createFeature({
  name: ENVIRONMENTS_FEATURE_KEY,
  reducer: createReducer(
    initialEnvironmentsState,
    on(EnvironmentsActions.load, (state) => ({ ...state, loaded: false, error: null })),
    on(EnvironmentsActions.loadSuccess, (state, { environments }) => environmentsAdapter.setAll(environments, { ...state, loaded: true })),
    on(EnvironmentsActions.loadFailure, (state, { error }) => ({ ...state, error })),
    on(EnvironmentsActions.selectId, (state, { id }) => ({ ...state, selectedId: id })),
  ),
  extraSelectors({ selectEnvironmentsState }) {
    const { selectAll, selectEntities } = environmentsAdapter.getSelectors(selectEnvironmentsState);
    const selectSelectedId = createSelector(selectEnvironmentsState, (state: EnvironmentsState) => state.selectedId);
    const selectSelected = createSelector(selectEntities, selectSelectedId, (entities, selectedId) => (selectedId ? entities[selectedId] : undefined));

    return {
      selectAll,
      selectSelected
    }
  },
});
