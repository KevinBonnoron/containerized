import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';

import { FeatureEnvironmentsDataAccessModule, loadEnvironmentsGuard } from '@containerized/features/environments/data-access';
import { titleResolver } from '@containerized/ui';

const providers = [
  importProvidersFrom(FeatureEnvironmentsDataAccessModule),
];

const title = titleResolver;

const canActivate = [
  loadEnvironmentsGuard
]

export const appRoutes: Route[] = [
  { path: '', title, providers, canActivate, runGuardsAndResolvers: 'always', children: [
    { path: 'home', loadChildren: () => import('@containerized/features/welcome/ui').then((m) => m.routes) },
    { path: 'docker', loadChildren: () => import('@containerized/features/docker/ui').then((m) => m.routes) },
  ] }
];
