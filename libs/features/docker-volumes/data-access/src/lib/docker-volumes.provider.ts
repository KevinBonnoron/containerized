import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders } from '@angular/core';
import { DockerVolumesStore } from './docker-volumes.store';
import { DockerVolumesGateway } from './gateways';
import { DockerVolumesService } from './services';

export const provideDockerVolumes = () => makeEnvironmentProviders([DockerVolumesStore, DockerVolumesService, DockerVolumesGateway, { provide: ENVIRONMENT_INITIALIZER, useValue: () => inject(DockerVolumesGateway), multi: true }]);
