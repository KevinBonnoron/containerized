import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { DockerVolumesService } from '../services';

import { DockerVolumesActions } from './docker-volumes.actions';

export const DockerVolumesEffects = {
  load$: createEffect((
    actions$ = inject(Actions),
    dockerVolumesService = inject(DockerVolumesService),
  ) => {
    return actions$.pipe(
      ofType(DockerVolumesActions.load),
      switchMap(() => dockerVolumesService.loadAll().pipe(
        map((dockerVolumes) => DockerVolumesActions.loadSuccess({ dockerVolumes }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerVolumesActions.loadFailure({ error }));
      })
    )
  }, { functional: true })
};
