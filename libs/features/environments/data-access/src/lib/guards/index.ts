import { inject } from '@angular/core';
import { isTrue } from 'monadojs';
import { filter, first, of, switchMap } from 'rxjs';

import { EnvironmentsFacade } from '../+state/environments.facade';

export const loadEnvironmentsGuard = () => {
  const environmentsFacade = inject(EnvironmentsFacade);

  return environmentsFacade.loaded$.pipe(
    first(),
    switchMap((loaded) => {
      if (loaded) {
        return of(true);
      }

      environmentsFacade.load();
      return environmentsFacade.loaded$.pipe(filter(isTrue));
    })
  );
};
