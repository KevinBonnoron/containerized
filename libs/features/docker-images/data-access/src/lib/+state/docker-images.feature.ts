import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { DockerImagesActions } from './docker-images.actions';
import { DockerImagesEntity } from './docker-images.models';

const DOCKER_IMAGES_FEATURE_KEY = 'dockerImages';

export interface DockerImagesState extends EntityState<DockerImagesEntity> {
  selectedId?: string | number; // which DockerImages record has been selected
  loaded: boolean; // has the DockerImages list been loaded
  error?: string | null; // last known error (if any)
}

export interface DockerImagesPartialState {
  readonly [DOCKER_IMAGES_FEATURE_KEY]: DockerImagesState;
}

export const dockerImagesAdapter: EntityAdapter<DockerImagesEntity> =
  createEntityAdapter<DockerImagesEntity>();

export const initialDockerImagesState = dockerImagesAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const DockerImagesFeature = createFeature({
  name: DOCKER_IMAGES_FEATURE_KEY,
  reducer: createReducer(
    initialDockerImagesState,
    on(DockerImagesActions.loadSuccess, (state, { dockerImages }) => dockerImagesAdapter.setAll(dockerImages, state)),
    on(DockerImagesActions.deleteSuccess, (state, { dockerImage }) => dockerImagesAdapter.removeOne(dockerImage.id, state)),
  ),
  extraSelectors({ selectDockerImagesState }) {
    const { selectAll } = dockerImagesAdapter.getSelectors(selectDockerImagesState);

    return {
      selectAll,
    }
  },
})
