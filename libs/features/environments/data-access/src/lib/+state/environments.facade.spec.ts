import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as EnvironmentsActions from './docker-containers.actions';
import { EnvironmentsEffects } from './docker-containers.effects';
import {
  DOCKER_CONTAINERS_FEATURE_KEY,
  EnvironmentsState,
  dockerContainersReducer
} from './docker-containers.feature';
import { EnvironmentsEntity } from './docker-containers.models';
import { EnvironmentsFacade } from './environments.facade';

interface TestSchema {
  dockerContainers: EnvironmentsState;
}

describe('EnvironmentsFacade', () => {
  let facade: EnvironmentsFacade;
  let store: Store<TestSchema>;
  const createEnvironmentsEntity = (
    id: string,
    name = ''
  ): EnvironmentsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            DOCKER_CONTAINERS_FEATURE_KEY,
            dockerContainersReducer
          ),
          EffectsModule.forFeature([EnvironmentsEffects]),
        ],
        providers: [EnvironmentsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(EnvironmentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allEnvironments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allEnvironments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadEnvironmentsSuccess` to manually update list
     */
    it('allEnvironments$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allEnvironments$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        EnvironmentsActions.loadEnvironmentsSuccess({
          dockerContainers: [
            createEnvironmentsEntity('AAA'),
            createEnvironmentsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allEnvironments$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
