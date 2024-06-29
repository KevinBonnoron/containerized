import { computed } from '@angular/core';
import { withCrud } from '@containerized/data-access';
import { DockerNetworkDto } from '@containerized/shared';
import { signalStore, withComputed, withHooks } from '@ngrx/signals';
import { DockerNetworksService } from './services';

export const DockerNetworksStore = signalStore(
  withCrud<DockerNetworkDto>(DockerNetworksService),
  withComputed(({ selectedId, entityMap }) => ({
    selected: computed(() => {
      const id = selectedId();
      return id ? entityMap()[id] : undefined;
    })
  })),
  withHooks({
    onInit: (store) => store.load(),
  }),
);