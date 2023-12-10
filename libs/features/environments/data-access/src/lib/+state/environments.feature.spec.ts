import { Action } from '@ngrx/store';

import * as EnvironmentsActions from './environments.actions';
import {
  EnvironmentsState,
  environmentsReducer,
  initialEnvironmentsState,
} from './environments.feature';
import { EnvironmentsEntity } from './environments.models';

describe('Environments Reducer', () => {
  const createEnvironmentsEntity = (
    id: string,
    name = ''
  ): EnvironmentsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Environments actions', () => {
    it('loadEnvironmentsSuccess should return the list of known Environments', () => {
      const environments = [
        createEnvironmentsEntity('PRODUCT-AAA'),
        createEnvironmentsEntity('PRODUCT-zzz'),
      ];
      const action = EnvironmentsActions.loadEnvironmentsSuccess({
        environments,
      });

      const result: EnvironmentsState = environmentsReducer(
        initialEnvironmentsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = environmentsReducer(initialEnvironmentsState, action);

      expect(result).toBe(initialEnvironmentsState);
    });
  });
});
