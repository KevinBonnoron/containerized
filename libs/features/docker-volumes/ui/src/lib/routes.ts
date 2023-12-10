import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import { FeatureDockerVolumesDataAccessModule } from '@containerized/features/docker-volumes/data-access';

const providers = [
  importProvidersFrom(
    FeatureDockerVolumesDataAccessModule,
  )
]

export const routes: Routes = [
  { path: '', providers, children: [
    { path: '', pathMatch: 'full', loadComponent: () => import('./components').then((m) => m.DockerVolumeHomeComponent) },
  ] }
];
