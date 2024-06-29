import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';

import { toObservable } from '@angular/core/rxjs-interop';
import { isTrue } from 'monadojs';
import { filter, map } from 'rxjs';
import { DockerNetworksStore } from '../docker-networks.store';

export const loadDockerNetworksGuard: CanActivateFn = () => {
  const dockerNetworksStore = inject(DockerNetworksStore);
  return toObservable(dockerNetworksStore.loaded).pipe(
    filter(isTrue),
    map(() => true),
  );
}
