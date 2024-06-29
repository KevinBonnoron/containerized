import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanActivateFn } from '@angular/router';
import { filter, map } from 'rxjs';
import { EnvironmentsStore } from '../public_api';

export const ensureEnvironmentSelectedGuard: CanActivateFn = (route) => {
  const environmentsStore = inject(EnvironmentsStore);
  const environmentId = route.paramMap.get('environmentId');
  if (environmentId) {
    environmentsStore.selectId(parseInt(environmentId));
  }

  return toObservable(environmentsStore.selected).pipe(
    filter((value) => value !== undefined),
    map(() => true)
  );
}
