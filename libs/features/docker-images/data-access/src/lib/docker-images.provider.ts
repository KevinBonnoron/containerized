import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders } from '@angular/core';
import { DockerImagesStore } from './docker-images.store';
import { DockerImagesGateway } from './gateways';
import { DockerImagesService } from './services';

export const provideDockerImages = () => makeEnvironmentProviders([
  DockerImagesStore,
  DockerImagesService,
  DockerImagesGateway,
  { provide: ENVIRONMENT_INITIALIZER, useValue: () => inject(DockerImagesGateway), multi: true },
]);
