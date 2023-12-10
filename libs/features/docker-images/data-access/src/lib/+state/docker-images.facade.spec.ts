import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as DockerImagesActions from './docker-images.actions';
import { DockerImagesEffects } from './docker-images.effects';
import { DockerImagesFacade } from './docker-images.facade';
import {
  DOCKER_IMAGES_FEATURE_KEY,
  DockerImagesState,
  dockerImagesReducer
} from './docker-images.feature';
import { DockerImagesEntity } from './docker-images.models';

interface TestSchema {
  dockerImages: DockerImagesState;
}

describe('DockerImagesFacade', () => {
  let facade: DockerImagesFacade;
  let store: Store<TestSchema>;
  const createDockerImagesEntity = (
    id: string,
    name = ''
  ): DockerImagesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(
            DOCKER_IMAGES_FEATURE_KEY,
            dockerImagesReducer
          ),
          EffectsModule.forFeature([DockerImagesEffects]),
        ],
        providers: [DockerImagesFacade],
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
      facade = TestBed.inject(DockerImagesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allDockerImages$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allDockerImages$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadDockerImagesSuccess` to manually update list
     */
    it('allDockerImages$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allDockerImages$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        DockerImagesActions.loadDockerImagesSuccess({
          dockerImages: [
            createDockerImagesEntity('AAA'),
            createDockerImagesEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allDockerImages$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
