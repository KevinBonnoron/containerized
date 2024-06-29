import { importProvidersFrom } from '@angular/core';
import type { Routes } from '@angular/router';

import { FeatureDockerEventsDataAccessModule } from '@containerized/features/docker-events/data-access';

const providers = [
  importProvidersFrom(
    FeatureDockerEventsDataAccessModule,
  )
];

export const dockerEventsRoutes: Routes = [
  { path: '', providers, children: [
    { path: 'list', loadComponent: () => import('./components').then((m) => m.DockerEventsViewComponent), data: { title: 'events.list.title' } },
    { path: '', pathMatch: 'full', redirectTo: 'list' },
  ] }
];
