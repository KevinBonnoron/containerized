import { inject } from '@angular/core';
import { RedirectCommand, Router, type ActivatedRouteSnapshot, type ResolveFn } from '@angular/router';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { DockerVolumeDto } from '@containerized/shared';
import { DockerVolumesStore } from '../docker-volumes.store';

export const dockerVolumeRouteResolver: ResolveFn<DockerVolumeDto> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const dockerVolumesStore = inject(DockerVolumesStore);
  const environmentsStore = inject(EnvironmentsStore);
  const router = inject(Router);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    dockerVolumesStore.selectId(id);
  }

  return dockerVolumesStore.selected() ?? new RedirectCommand(router.createUrlTree(['docker', environmentsStore.selectedId(), 'volumes']));
}
