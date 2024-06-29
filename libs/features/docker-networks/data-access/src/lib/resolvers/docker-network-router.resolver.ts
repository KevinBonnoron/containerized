import { inject } from '@angular/core';
import { RedirectCommand, Router, type ActivatedRouteSnapshot, type ResolveFn } from '@angular/router';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { DockerNetworkDto } from '@containerized/shared';
import { DockerNetworksStore } from '../docker-networks.store';

export const dockerNetworkRouteResolver: ResolveFn<DockerNetworkDto> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const dockerNetworksStore = inject(DockerNetworksStore);
  const environmentsStore = inject(EnvironmentsStore);
  const router = inject(Router);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    dockerNetworksStore.selectId(id);
  }

  return dockerNetworksStore.selected() ?? new RedirectCommand(router.createUrlTree(['docker', environmentsStore.selectedId(), 'networks']));
}
