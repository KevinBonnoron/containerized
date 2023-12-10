import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { DockerVolumesActions } from './docker-volumes.actions';
import { DockerVolumesEntity } from './docker-volumes.models';

const DOCKER_VOLUMES_FEATURE_KEY = 'dockerVolumes';

export interface DockerVolumesState extends EntityState<DockerVolumesEntity> {
  selectedId?: string | number; // which Volumes record has been selected
  loaded: boolean; // has the Volumes list been loaded
  error?: string | null; // last known error (if any)
}

export interface DockerVolumesPartialState {
  readonly [DOCKER_VOLUMES_FEATURE_KEY]: DockerVolumesState;
}

export const dockerVolumesAdapter: EntityAdapter<DockerVolumesEntity> =
  createEntityAdapter<DockerVolumesEntity>({ selectId: (dockerVolume) => dockerVolume.name });

export const initialVolumesState = dockerVolumesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const DockerVolumesFeature = createFeature({
  name: DOCKER_VOLUMES_FEATURE_KEY,
  reducer: createReducer(
    initialVolumesState,
    on(DockerVolumesActions.load, (state) => ({ ...state, loaded: false, error: null })),
    on(DockerVolumesActions.loadSuccess, (state, { dockerVolumes }) => dockerVolumesAdapter.setAll(dockerVolumes, { ...state, loaded: true })),
    on(DockerVolumesActions.loadFailure, (state, { error }) => ({ ...state, error }))
  ),
  extraSelectors({ selectDockerVolumesState }) {
    const { selectAll } = dockerVolumesAdapter.getSelectors(selectDockerVolumesState);

    return {
      selectAll,
    }
  },
});
