import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as DockerContainersActions from './docker-containers.actions';
import { DockerContainersEffects } from './docker-containers.effects';
import { DockerContainersFacade } from './docker-containers.facade';
import {
  DOCKER_CONTAINERS_FEATURE_KEY,
  DockerContainersState,
  dockerContainersReducer
} from './docker-containers.feature';
import { DockerContainersEntity } from './docker-containers.models';

interface TestSchema {
  dockerContainers: DockerContainersState;
}

describe('DockerContainersFacade', () => {
  let facade: DockerContainersFacade;
  let store: Store<TestSchema>;
  const createDockerContainersEntity = (
    id: string,
    name = ''
  ): DockerContainersEntity => ({
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
          EffectsModule.forFeature([DockerContainersEffects]),
        ],
        providers: [DockerContainersFacade],
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
      facade = TestBed.inject(DockerContainersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDockerContainers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDockerContainers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDockerContainersSuccess` to manually update list
     */
    it('allDockerContainers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDockerContainers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DockerContainersActions.loadDockerContainersSuccess({
          dockerContainers: [
            createDockerContainersEntity('AAA'),
            createDockerContainersEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allDockerContainers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
