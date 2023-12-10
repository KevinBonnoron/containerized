import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { DockerContainersActions } from './docker-containers.actions';
import { DockerContainersEntity } from './docker-containers.models';

const DOCKER_CONTAINERS_FEATURE_KEY = 'dockerContainers';

export interface DockerContainersState
  extends EntityState<DockerContainersEntity> {
  selectedId?: string | number; // which DockerContainers record has been selected
  loaded: boolean; // has the DockerContainers list been loaded
  error?: string | null; // last known error (if any)
}

export interface DockerContainersPartialState {
  readonly [DOCKER_CONTAINERS_FEATURE_KEY]: DockerContainersState;
}

export const dockerContainersAdapter: EntityAdapter<DockerContainersEntity> =
  createEntityAdapter<DockerContainersEntity>();

export const initialDockerContainersState =
  dockerContainersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

export const DockerContainersFeature = createFeature({
  name: DOCKER_CONTAINERS_FEATURE_KEY,
  reducer: createReducer(
    initialDockerContainersState,
    on(DockerContainersActions.loadSuccess, (state, { dockerContainers }) => dockerContainersAdapter.setAll(dockerContainers, state)),
    on(DockerContainersActions.startSuccess, (state, { id }) => dockerContainersAdapter.updateOne({ id, changes: { status: 'running' } }, state)),
    on(DockerContainersActions.stopSuccess, (state, { id }) => dockerContainersAdapter.updateOne({ id, changes: { status: 'exited' } }, state)),
    on(DockerContainersActions.createSuccess, (state, { dockerContainer }) => dockerContainersAdapter.addOne(dockerContainer, state)),
    on(DockerContainersActions.deleteSuccess, (state, { id }) => dockerContainersAdapter.removeOne(id, state)),
    on(DockerContainersActions.selectId, (state, { id }) => ({ ...state, selectedId: id })),
  ),
  extraSelectors({ selectDockerContainersState }) {
    const { selectAll, selectEntities } = dockerContainersAdapter.getSelectors(selectDockerContainersState);
    const selectSelectedId = createSelector(selectDockerContainersState, (state: DockerContainersState) => state.selectedId);
    const selectSelected = createSelector(selectEntities, selectSelectedId, (entities, selectedId) => (selectedId ? entities[selectedId] : undefined));

    return {
      selectAll,
      selectSelected
    }
  },
});
