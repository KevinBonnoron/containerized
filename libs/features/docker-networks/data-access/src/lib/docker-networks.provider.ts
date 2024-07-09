import { ENVIRONMENT_INITIALIZER, inject, makeEnvironmentProviders } from '@angular/core';
import { DockerNetworksStore } from './docker-networks.store';
import { DockerNetworksGateway } from './gateways';
import { DockerNetworksService } from './services';

export const provideDockerNetworks = () => makeEnvironmentProviders([DockerNetworksStore, DockerNetworksService, DockerNetworksGateway, { provide: ENVIRONMENT_INITIALIZER, useValue: () => inject(DockerNetworksGateway), multi: true }]);
