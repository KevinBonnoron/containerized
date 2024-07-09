import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DockerInfoDto } from '@containerized/shared';
import { patchState, signalStore, withHooks, withState } from '@ngrx/signals';
import { DockerSystemService } from './services';

export const DockerSystemStore = signalStore(
  withState<{ info: DockerInfoDto | undefined }>({ info: undefined }),
  withHooks({
    onInit(store) {
      const dockerService = inject(DockerSystemService);
      dockerService
        .getInfo()
        .pipe(takeUntilDestroyed())
        .subscribe((info) => patchState(store, { info }));
    },
  })
);
