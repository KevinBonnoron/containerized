import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';

import { toObservable } from '@angular/core/rxjs-interop';
import { isTrue } from 'monadojs';
import { filter, map } from 'rxjs';
import { RegistriesStore } from '../registries.store';

export const registriesLoadedGuard: CanActivateFn = () => {
  const registriesStore = inject(RegistriesStore);
  return toObservable(registriesStore.loaded).pipe(
    filter(isTrue),
    map(() => true)
  );
};
