import type { Routes } from '@angular/router';
import { ShellHomeComponent } from './components';

export const routes: Routes = [
  {
    path: '',
    component: ShellHomeComponent,
    children: [
      {
        path: 'welcome',
        loadChildren: () => import('@containerized/features/welcome/ui').then((m) => m.routes),
      },
      {
        path: 'environments',
        loadChildren: () => import('@containerized/features/environments/ui').then((m) => m.environmentRoutes),
      },
      {
        path: 'registries',
        loadChildren: () => import('@containerized/features/registries/ui').then((m) => m.registryRoutes),
      },
      {
        path: 'docker',
        loadChildren: () => import('@containerized/features/docker-system/ui').then((m) => m.dockerSystemRoutes),
      },
      { path: '**', redirectTo: 'welcome' },
    ],
  },
];
