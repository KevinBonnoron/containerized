import { inject } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of, switchMap } from 'rxjs';

import { EnvironmentsFacade } from '@containerized/features/environments/data-access';

import { DockerContainersService } from '../services';

import { DockerContainersActions } from './docker-containers.actions';

export const DockerContainersEffects = {
  load$: createEffect((
    actions$ = inject(Actions),
    environmentsFacade = inject(EnvironmentsFacade),
    dockerContainersServices = inject(DockerContainersService),
  ) => {
    return actions$.pipe(
      ofType(DockerContainersActions.load),
      concatLatestFrom(() => environmentsFacade.selected$),
      concatMap(([, { id: environmentId }]) => dockerContainersServices.loadAll(environmentId).pipe(
        map((dockerContainers) => DockerContainersActions.loadSuccess({ dockerContainers }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerContainersActions.loadFailure({ error }));
      })
    )
  }, { functional: true }),

  create$: createEffect((
    actions$ = inject(Actions),
    environmentsFacade = inject(EnvironmentsFacade),
    dockerContainersServices = inject(DockerContainersService),
  ) => {
    return actions$.pipe(
      ofType(DockerContainersActions.create),
      concatLatestFrom(() => environmentsFacade.selected$),
      concatMap(([{ dockerContainer }, { id: environmentId }]) => dockerContainersServices.create(environmentId, dockerContainer).pipe(
        map((dockerContainer) => DockerContainersActions.createSuccess({ dockerContainer }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerContainersActions.createFailure({ error }));
      })
    );
  }, { functional: true }),

  start$: createEffect((
    actions$ = inject(Actions),
    environmentsFacade = inject(EnvironmentsFacade),
    dockerContainersServices = inject(DockerContainersService),
  ) => {
    return actions$.pipe(
      ofType(DockerContainersActions.start),
      concatLatestFrom(() => environmentsFacade.selected$),
      concatMap(([{ id }, { id: environmentId }]) => dockerContainersServices.start(environmentId, id).pipe(
        map(() => DockerContainersActions.startSuccess({ id })),
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerContainersActions.startFailure({ error }));
      })
    );
  }, { functional: true }),

  restart$: createEffect((
    actions$ = inject(Actions),
    environmentsFacade = inject(EnvironmentsFacade),
    dockerContainersServices = inject(DockerContainersService),
  ) => {
    return actions$.pipe(
      ofType(DockerContainersActions.restart),
      concatLatestFrom(() => environmentsFacade.selected$),
      concatMap(([{ id }, { id: environmentId }]) => dockerContainersServices.stop(environmentId, id).pipe(
        switchMap(() => dockerContainersServices.start(environmentId, id)),
        map(() => DockerContainersActions.restartSuccess({ id }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerContainersActions.restartFailure({ error }));
      })
    );
  }, { functional: true }),

  stop$: createEffect((
    actions$ = inject(Actions),
    environmentsFacade = inject(EnvironmentsFacade),
    dockerContainersServices = inject(DockerContainersService),
  ) => {
    return actions$.pipe(
      ofType(DockerContainersActions.stop),
      concatLatestFrom(() => environmentsFacade.selected$),
      concatMap(([{ id }, { id: environmentId }]) => dockerContainersServices.stop(environmentId, id).pipe(
        map(() => DockerContainersActions.stopSuccess({ id }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerContainersActions.stopFailure({ error }));
      })
    );
  }, { functional: true }),

  delete$: createEffect((
    actions$ = inject(Actions),
    environmentsFacade = inject(EnvironmentsFacade),
    dockerContainersServices = inject(DockerContainersService),
  ) => {
    return actions$.pipe(
      ofType(DockerContainersActions.delete),
      concatLatestFrom(() => environmentsFacade.selected$),
      concatMap(([{ id }, { id: environmentId }]) => dockerContainersServices.delete(environmentId, id).pipe(
        map(() => DockerContainersActions.deleteSuccess({ id }))
      )),
      catchError((error) => {
        console.error('Error', error);
        return of(DockerContainersActions.deleteFailure({ error }));
      })
    )
  }, { functional: true }),
};
