import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as VolumesActions from './docker-volumes.actions';
import { VolumesEffects } from './docker-volumes.effects';
import { VolumesFacade } from './docker-volumes.facade';
import {
  DockerVolumesState,
  VOLUMES_FEATURE_KEY,
  volumesReducer
} from './docker-volumes.feature';
import { DockerVolumesEntity } from './docker-volumes.models';

interface TestSchema {
  volumes: DockerVolumesState;
}

describe('VolumesFacade', () => {
  let facade: VolumesFacade;
  let store: Store<TestSchema>;
  const createVolumesEntity = (id: string, name = ''): DockerVolumesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(VOLUMES_FEATURE_KEY, volumesReducer),
          EffectsModule.forFeature([VolumesEffects]),
        ],
        providers: [VolumesFacade],
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
      facade = TestBed.inject(VolumesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allVolumes$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allVolumes$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadVolumesSuccess` to manually update list
     */
    it('allVolumes$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allVolumes$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        VolumesActions.loadVolumesSuccess({
          volumes: [createVolumesEntity('AAA'), createVolumesEntity('BBB')],
        })
      );

      list = await readFirst(facade.allVolumes$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
