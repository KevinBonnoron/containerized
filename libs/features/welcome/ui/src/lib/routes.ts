import type { Routes } from '@angular/router';

import { provideChildTranslate } from '@containerized/ui';

import * as en from '../assets/i18n/en.json';
import * as fr from '../assets/i18n/fr.json';

const providers = [provideChildTranslate({ fr, en })];

export const routes: Routes = [
  {
    path: '',
    providers,
    children: [
      { path: 'home', loadComponent: () => import('./components').then((m) => m.WelcomeHomeComponent), data: { title: 'home.welcome.title' } },
      { path: '**', pathMatch: 'full', redirectTo: 'home' },
    ],
  },
];
