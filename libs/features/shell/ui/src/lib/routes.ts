import { importProvidersFrom } from '@angular/core';
import type { Routes } from '@angular/router';

import { FeatureEnvironmentsDataAccessModule } from '@containerized/features/environments/data-access';
import { ShellHomeComponent } from './components';

const providers = [importProvidersFrom(FeatureEnvironmentsDataAccessModule)];

export const routes: Routes = [
  {
    path: '',
    providers,
    component: ShellHomeComponent,
    children: [
      { path: 'welcome', loadChildren: () => import('@containerized/features/welcome/ui').then((m) => m.routes) },
      { path: 'environments', loadChildren: () => import('@containerized/features/environments/ui').then((m) => m.environmentRoutes) },
      { path: 'docker', providers, loadChildren: () => import('@containerized/features/docker-system/ui').then((m) => m.dockerSystemRoutes) },
      { path: '**', redirectTo: 'welcome' },
    ],
  },
];
