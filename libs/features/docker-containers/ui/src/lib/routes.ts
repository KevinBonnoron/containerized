import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import { FeatureDockerContainersDataAccessModule, dockerContainerRouteResolver } from '@containerized/features/docker-containers/data-access';

const providers = [
  importProvidersFrom(
    FeatureDockerContainersDataAccessModule,
  )
];

export const routes: Routes = [
  { path: '', providers, children: [
    { path: 'edit/:id', loadComponent: () => import('./components').then((m) => m.DockerContainerEditComponent), resolve: { dockerContainer: dockerContainerRouteResolver } },
    { path: 'list', loadComponent: () => import('./components').then((m) => m.DockerContainerHomeComponent), data: { title: 'container.list.title' } },
    { path: '', pathMatch: 'full', redirectTo: 'list' },
  ] }
];
