import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';

import { DockerImagesService } from '../services';

import { DockerImagesActions } from './docker-images.actions';

export const DockerImagesEffects = {
  load$: createEffect((
    actions$ = inject(Actions),
    dockerImagesService = inject(DockerImagesService),
  ) => {
    return actions$.pipe(
      ofType(DockerImagesActions.load),
      concatMap(() => dockerImagesService.loadAll().pipe(
        map((dockerImages) => DockerImagesActions.loadSuccess({ dockerImages }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerImagesActions.loadFailure({ error }));
      })
    )
  }, { functional: true })
};
