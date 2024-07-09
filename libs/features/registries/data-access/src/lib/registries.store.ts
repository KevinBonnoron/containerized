import { withCrud } from '@containerized/data-access';
import type { RegistryDto } from '@containerized/shared';
import { signalStore, withHooks } from '@ngrx/signals';
import { RegistriesService } from './services';

export const RegistriesStore = signalStore(
  withCrud<RegistryDto>(RegistriesService),
  withHooks({
    onInit: (store) => store.load(),
  })
);
