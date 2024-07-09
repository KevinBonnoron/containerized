import { makeEnvironmentProviders } from '@angular/core';
import { RegistriesStore } from './registries.store';
import { RegistriesService } from './services/registries/registries.service';

export const provideRegistries = () => makeEnvironmentProviders([RegistriesStore, RegistriesService]);
