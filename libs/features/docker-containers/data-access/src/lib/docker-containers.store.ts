import { inject } from '@angular/core';
import { setFailure, setSuccess, withCrud } from '@containerized/data-access';
import type { DockerContainerDto } from '@containerized/shared';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, updateEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { DockerContainersService } from '../../../data-access/src/lib/services';

export const DockerContainersStore = signalStore(
  withCrud<DockerContainerDto>(DockerContainersService),
  withMethods((store) => {
    const dockerContainersService = inject(DockerContainersService);

    return {
      start: rxMethod<DockerContainerDto['id']>(
        pipe(
          tap((id) => patchState(store, updateEntity({ id, changes: { status: 'starting' } }))),
          switchMap((id) =>
            dockerContainersService.start(id).pipe(
              tap(() => patchState(store, updateEntity({ id, changes: { status: 'running' } }))),
              catchError((error) => {
                patchState(store, updateEntity({ id, changes: { status: 'exited' } }));
                return of(error);
              })
            )
          )
        )
      ),
      stop: rxMethod<DockerContainerDto['id']>(
        pipe(
          tap((id) => patchState(store, updateEntity({ id, changes: { status: 'stopping' } }))),
          switchMap((id) => dockerContainersService.stop(id).pipe(tap(() => patchState(store, updateEntity({ id, changes: { status: 'exited' } })))))
        )
      ),
      restart: rxMethod<DockerContainerDto['id']>(switchMap((id) => dockerContainersService.start(id).pipe(switchMap(() => dockerContainersService.stop(id))))),
      replace: rxMethod<DockerContainerDto>(
        pipe(
          switchMap(({ id, ...dockerContainer }) => {
            const entities = store.entities();
            if (entities.find((dockerContainer) => dockerContainer.id === id)) {
              return dockerContainersService.remove({ id, ...dockerContainer }).pipe(
                map(() => dockerContainer),
                tap(() => patchState(store, removeEntity(id)))
              );
            }

            return of(dockerContainer);
          }),
          switchMap((dockerContainer) =>
            dockerContainersService.run(dockerContainer).pipe(
              tap((dockerContainer) => patchState(store, addEntity(dockerContainer), setSuccess())),
              catchError((error) => {
                patchState(store, setFailure());
                return of(error);
              })
            )
          )
        )
      ),
    };
  }),
  withHooks({
    onInit: (store) => store.load(),
  })
);
