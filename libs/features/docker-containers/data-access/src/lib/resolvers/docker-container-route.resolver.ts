import { inject } from '@angular/core';
import { RedirectCommand, Router, type ActivatedRouteSnapshot, type ResolveFn } from '@angular/router';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { DockerContainerDto } from '@containerized/shared';
import { DockerContainersStore } from '../docker-containers.store';

export const dockerContainerRouteResolver: ResolveFn<DockerContainerDto> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const dockerContainersStore = inject(DockerContainersStore);
  const environmentsStore = inject(EnvironmentsStore);
  const router = inject(Router);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    dockerContainersStore.selectId(id);
  }

  return dockerContainersStore.selected() ?? new RedirectCommand(router.createUrlTree(['docker', environmentsStore.selectedId(), 'container']));
}
