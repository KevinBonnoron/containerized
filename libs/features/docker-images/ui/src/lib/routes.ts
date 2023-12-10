import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import { FeatureDockerImagesDataAccessModule } from '@containerized/features/docker-images/data-access';

const providers = [
  importProvidersFrom(
    FeatureDockerImagesDataAccessModule,
  )
]

export const routes: Routes = [
  { path: '', providers, children: [
    { path: '', pathMatch: 'full', loadComponent: () => import('./components').then((m) => m.DockerImageHomeComponent) },
  ] }
];
