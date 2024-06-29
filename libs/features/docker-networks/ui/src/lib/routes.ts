import type { Routes } from '@angular/router';

import { loadDockerNetworksGuard, provideDockerNetworks } from '@containerized/features/docker-networks/data-access';
import { DockerNetworksCreateComponent } from './components';

const providers = [
  provideDockerNetworks(),
];

const canActivate = [
  loadDockerNetworksGuard,
];

export const networkRoutes: Routes = [
  { path: '', providers, canActivate, children: [
    { path: 'view', loadComponent: () => import('./components').then((m) => m.DockerNetworksViewComponent), children: [
      { path: 'create', loadComponent: () => import('./components').then((m) => m.DockerNetworksDialogComponent), data: { title: 'container.create.title', dialogComponent: DockerNetworksCreateComponent } },
    ] },
    { path: '', pathMatch: 'full', redirectTo: 'view' },
  ] }
];
