import { inject } from '@angular/core';
import { setFailure, setSuccess, withCrud } from '@containerized/data-access';
import { DockerImageDto } from '@containerized/shared';
import { patchState, signalStore, withHooks, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, switchMap, tap } from 'rxjs';
import { DockerImagesService } from './services';

export const DockerImagesStore = signalStore(
  withCrud<DockerImageDto>(DockerImagesService),
  withMethods((store) => {
    const service = inject(DockerImagesService);

    return {
      pull: rxMethod<string>(
        switchMap((image) =>
          service.pull(image).pipe(
            tap(
              () => patchState(store, setSuccess()),
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
