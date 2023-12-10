import { Action } from '@ngrx/store';

import * as DockerImagesActions from './docker-images.actions';
import {
  DockerImagesState,
  dockerImagesReducer,
  initialDockerImagesState,
} from './docker-images.feature';
import { DockerImagesEntity } from './docker-images.models';

describe('DockerImages Reducer', () => {
  const createDockerImagesEntity = (
    id: string,
    name = ''
  ): DockerImagesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid DockerImages actions', () => {
    it('loadDockerImagesSuccess should return the list of known DockerImages', () => {
      const dockerImages = [
        createDockerImagesEntity('PRODUCT-AAA'),
        createDockerImagesEntity('PRODUCT-zzz'),
      ];
      const action = DockerImagesActions.loadDockerImagesSuccess({
        dockerImages,
      });

      const result: DockerImagesState = dockerImagesReducer(
        initialDockerImagesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = dockerImagesReducer(initialDockerImagesState, action);

      expect(result).toBe(initialDockerImagesState);
    });
  });
});
