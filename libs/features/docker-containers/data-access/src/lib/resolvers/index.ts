import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError, timeout } from 'rxjs';

import { DockerContainersFacade } from '../+state/docker-containers.facade';
import { DockerContainersEntity } from '../+state/docker-containers.models';

export const dockerContainerRouteResolver: ResolveFn<DockerContainersEntity> = (activatedRouteSnapshot: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const dockerContainersFacade = inject(DockerContainersFacade);

  const id = activatedRouteSnapshot.paramMap.get('id');
  if (id) {
    dockerContainersFacade.setSelectedId(id);
  }

  return dockerContainersFacade.selected$.pipe(
    timeout(10),
    catchError(() => {
      router.navigate(['/']);
      return EMPTY;
    })
  );
}
