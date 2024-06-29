import { withCrud } from '@containerized/data-access';
import { DockerEventDto } from '@containerized/shared';
import { signalStore, withHooks } from '@ngrx/signals';
import { DockerEventsService } from './services';

export const DockerEventsStore = signalStore(
  withCrud<DockerEventDto>(DockerEventsService),
  withHooks({
    onInit: (store) => store.load(),
  }),
);