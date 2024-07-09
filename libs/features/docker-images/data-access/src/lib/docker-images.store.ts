import { withCrud } from '@containerized/data-access';
import { DockerImageDto } from '@containerized/shared';
import { signalStore, withHooks } from '@ngrx/signals';
import { DockerImagesService } from './services';

export const DockerImagesStore = signalStore(
  withCrud<DockerImageDto>(DockerImagesService),
  withHooks({
    onInit: (store) => store.load(),
  })
);
