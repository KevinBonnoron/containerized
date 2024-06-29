import { importProvidersFrom } from '@angular/core';
import type { Routes } from '@angular/router';

import { FeatureDockerEventsDataAccessModule } from '@containerized/features/docker-events/data-access';
import { FeatureDockerSystemDataAccessModule } from '@containerized/features/docker-system/data-access';
import { ensureEnvironmentSelectedGuard } from '@containerized/features/environments/data-access';
import { isNumberMatcher } from '@containerized/ui';

const providers = [
  importProvidersFrom(FeatureDockerEventsDataAccessModule),
  importProvidersFrom(FeatureDockerSystemDataAccessModule),
];

const canActivate = [
  ensureEnvironmentSelectedGuard
];

export const dockerSystemRoutes: Routes = [
  { path: ':environmentId', canMatch: [isNumberMatcher('environmentId')], providers, canActivate, children: [
    { path: 'home', loadComponent: () => import('./components').then((m) => m.DockerHomeComponent) },
    { path: 'containers', loadChildren: () => import('@containerized/features/docker-containers/ui').then((m) => m.dockerContainersRoutes) },
    { path: 'images', loadChildren: () => import('@containerized/features/docker-images/ui').then((m) => m.dockerImagesRoutes) },
    { path: 'volumes', loadChildren: () => import('@containerized/features/docker-volumes/ui').then((m) => m.dockerVolumesRoutes) },
    { path: 'events', loadChildren: () => import('@containerized/features/docker-events/ui').then((m) => m.dockerEventsRoutes) },
    { path: 'networks', loadChildren: () => import('@containerized/features/docker-networks/ui').then((m) => m.networkRoutes) },
    { path: '**', pathMatch: 'full', redirectTo: 'home' },
  ] },
];
