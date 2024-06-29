import { withCrud } from '@containerized/data-access';
import { EnvironmentDto } from '@containerized/shared';
import { signalStore, withHooks } from '@ngrx/signals';
import { EnvironmentsService } from './services';

export const EnvironmentsStore = signalStore(
  { providedIn: 'root' },
  withCrud<EnvironmentDto>(EnvironmentsService),
  withHooks({
    onInit: (store) => store.load(),
  }),
);
