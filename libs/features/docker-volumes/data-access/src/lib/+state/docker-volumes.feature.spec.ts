import { Action } from '@ngrx/store';

import * as VolumesActions from './docker-volumes.actions';
import {
  DockerVolumesState,
  initialVolumesState,
  volumesReducer,
} from './docker-volumes.feature';
import { DockerVolumesEntity } from './docker-volumes.models';

describe('Volumes Reducer', () => {
  const createVolumesEntity = (id: string, name = ''): DockerVolumesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Volumes actions', () => {
    it('loadVolumesSuccess should return the list of known Volumes', () => {
      const volumes = [
        createVolumesEntity('PRODUCT-AAA'),
        createVolumesEntity('PRODUCT-zzz'),
      ];
      const action = VolumesActions.loadVolumesSuccess({ volumes });

      const result: DockerVolumesState = volumesReducer(initialVolumesState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = volumesReducer(initialVolumesState, action);

      expect(result).toBe(initialVolumesState);
    });
  });
});
