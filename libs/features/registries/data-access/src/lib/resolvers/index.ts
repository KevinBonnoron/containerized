import { inject } from '@angular/core';
import { type ActivatedRouteSnapshot, RedirectCommand, type ResolveFn, Router } from '@angular/router';
import { RegistryDto } from '@containerized/shared';
import { RegistriesStore } from '../registries.store';

export const registryRouteResolver: ResolveFn<RegistryDto> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const registriesStore = inject(RegistriesStore);
  const router = inject(Router);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    registriesStore.selectId(id);
  }

  return registriesStore.selected() ?? new RedirectCommand(router.createUrlTree(['home']));
};
