import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { EnvironmentsService } from '../services';

import { EnvironmentsActions } from './environments.actions';

export const EnvironmentsEffects = {
  load$: createEffect((
    actions$ = inject(Actions),
    environmentsService = inject(EnvironmentsService)
  ) => {
    return actions$.pipe(
      ofType(EnvironmentsActions.load),
      switchMap(() => environmentsService.loadAll().pipe(
        map((environments) => EnvironmentsActions.loadSuccess({ environments }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(EnvironmentsActions.loadFailure({ error }));
      })
    );
  }, { functional: true }),
}
