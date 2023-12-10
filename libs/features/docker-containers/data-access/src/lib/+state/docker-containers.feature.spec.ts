import { Action } from '@ngrx/store';

import * as DockerContainersActions from './docker-containers.actions';
import {
  DockerContainersState,
  dockerContainersReducer,
  initialDockerContainersState,
} from './docker-containers.feature';
import { DockerContainersEntity } from './docker-containers.models';

describe('DockerContainers Feature', () => {
  const createDockerContainersEntity = (
    id: string,
    name = ''
  ): DockerContainersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid DockerContainers actions', () => {
    it('loadDockerContainersSuccess should return the list of known DockerContainers', () => {
      const dockerContainers = [
        createDockerContainersEntity('PRODUCT-AAA'),
        createDockerContainersEntity('PRODUCT-zzz'),
      ];
      const action = DockerContainersActions.loadDockerContainersSuccess({
        dockerContainers,
      });

      const result: DockerContainersState = dockerContainersReducer(
        initialDockerContainersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = dockerContainersReducer(
        initialDockerContainersState,
        action
      );

      expect(result).toBe(initialDockerContainersState);
    });
  });
});
