import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import { FeatureDockerEventsDataAccessModule } from '@containerized/features/docker-events/data-access';
import { environmentRouteResolver } from '@containerized/features/environments/data-access';

const providers = [
  importProvidersFrom(FeatureDockerEventsDataAccessModule)
];

const resolve = {
  environment: environmentRouteResolver
};

export const routes: Routes = [
  { path: ':environmentId', resolve, providers, children: [
    { path: 'containers', loadChildren: () => import('@containerized/features/docker-containers/ui').then((m) => m.routes) },
    { path: 'images', loadChildren: () => import('@containerized/features/docker-images/ui').then((m) => m.routes) },
    { path: 'volumes', loadChildren: () => import('@containerized/features/docker-volumes/ui').then((m) => m.routes) },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
  ] },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
];
