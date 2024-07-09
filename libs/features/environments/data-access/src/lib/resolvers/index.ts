import { inject } from '@angular/core';
import { type ActivatedRouteSnapshot, RedirectCommand, type ResolveFn, Router } from '@angular/router';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { EnvironmentDto } from '@containerized/shared';

export const environmentRouteResolver: ResolveFn<EnvironmentDto> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const environmentsStore = inject(EnvironmentsStore);
  const router = inject(Router);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    environmentsStore.selectId(id);
  }

  return environmentsStore.selected() ?? new RedirectCommand(router.createUrlTree(['home']));
};
