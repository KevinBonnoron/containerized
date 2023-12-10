import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError, timeout } from 'rxjs';

import { EnvironmentsFacade } from '../+state/environments.facade';
import { EnvironmentsEntity } from '../+state/environments.models';

export const environmentRouteResolver: ResolveFn<EnvironmentsEntity> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const environmentsFacade = inject(EnvironmentsFacade);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    environmentsFacade.setSelectedId(parseInt(id));
  }

  return environmentsFacade.selected$.pipe(
    timeout(10),
    catchError(() => {
      router.navigate(['/']);
      return EMPTY;
    })
  );
}
