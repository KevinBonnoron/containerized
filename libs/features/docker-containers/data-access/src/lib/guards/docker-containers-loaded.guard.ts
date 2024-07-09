import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';

import { toObservable } from '@angular/core/rxjs-interop';
import { isTrue } from 'monadojs';
import { filter, map } from 'rxjs';
import { DockerContainersStore } from '../docker-containers.store';

export const dockerContainersLoadedGuard: CanActivateFn = () => {
  const dockerContainersStore = inject(DockerContainersStore);
  return toObservable(dockerContainersStore.loaded).pipe(
    filter(isTrue),
    map(() => true)
  );
};
