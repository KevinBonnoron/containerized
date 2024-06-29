import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders } from '@angular/core';
import { DockerContainersStore } from './docker-containers.store';
import { DockerContainersGateway } from './gateways';
import { DockerContainersService } from './services';

export const provideDockerContainers = () => makeEnvironmentProviders([
  DockerContainersStore,
  DockerContainersService,
  DockerContainersGateway,
  { provide: ENVIRONMENT_INITIALIZER, useValue: () => inject(DockerContainersGateway), multi: true },
]);
