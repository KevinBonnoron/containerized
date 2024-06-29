import { withCrud } from '@containerized/data-access';
import { DockerVolumeDto } from '@containerized/shared';
import { signalStore, withHooks } from '@ngrx/signals';
import { DockerVolumesService } from './services';

export const DockerVolumesStore = signalStore(
  withCrud<DockerVolumeDto>(DockerVolumesService, 'name'),
  withHooks({
    onInit : (store) => store.load(),
  }),
);
