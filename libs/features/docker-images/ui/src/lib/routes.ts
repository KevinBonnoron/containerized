import type { Routes } from '@angular/router';

import { provideDockerImages } from '@containerized/features/docker-images/data-access';
import { provideChildTranslate } from '@containerized/ui';

import * as en from '../assets/i18n/en.json';
import * as fr from '../assets/i18n/fr.json';

const providers = [provideDockerImages(), provideChildTranslate({ fr, en })];

export const dockerImagesRoutes: Routes = [
  {
    path: '',
    providers,
    children: [
      { path: 'view', loadComponent: () => import('./components').then((m) => m.DockerImagesViewComponent), data: { title: 'image.view.title' } },
      { path: '', pathMatch: 'full', redirectTo: 'view' },
    ],
  },
];
